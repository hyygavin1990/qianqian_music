package com.qianqian.controller.system;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.qianqian.annotation.OperationLog;
import com.qianqian.constant.Constants;
import com.qianqian.controller.BaseController;
import com.qianqian.core.BusinessException;
import com.qianqian.core.ErrorCode;
import com.qianqian.core.JSONResult;
import com.qianqian.core.Result;
import com.qianqian.core.jqGrid.JqGridResult;
import com.qianqian.dto.DtoTransfer;
import com.qianqian.dto.UserDto;
import com.qianqian.dto.UserJqGridParam;
import com.qianqian.dto.UserRoleDto;
import com.qianqian.entity.mysql.oauth.Role;
import com.qianqian.entity.mysql.oauth.User;
import com.qianqian.service.oauth.RoleService;
import com.qianqian.service.oauth.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

/**
 * @author fonlin
 * @date 2018/4/23
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController {

    @Resource
    private UserService userService;
    @Resource
    private RoleService roleService;


    @RequestMapping("/list")
    public String list(Model model) {
        model.addAttribute("menus", getMenus("user"));
        model.addAttribute("roles", roleService.selectAll());
        return "/system/user/list";
    }

    @RequestMapping("/grid")
    @ResponseBody
    public Result grid(UserJqGridParam param) {
        PageInfo<User> pageInfo =  userService.selectByPage(param);

        JqGridResult<User> result = new JqGridResult<>();
        //当前页
        result.setPage(pageInfo.getPageNum());
        //数据总数
        result.setRecords(pageInfo.getTotal());
        //总页数
        result.setTotal(pageInfo.getPages());
        //当前页数据
        result.setRows(pageInfo.getList());
        return new JSONResult(result);
    }

    @OperationLog("新增用户")
    @RequestMapping("/insert")
    @ResponseBody
    public Result insert(@Valid @RequestBody UserDto dto) {
        if (userService.select("username", dto.getUsername()) != null) {
            throw new BusinessException(ErrorCode.USER_ALREADY_REG);
        }
        User user = DtoTransfer.userDto2Entity(dto);
        user.setPassword(new BCryptPasswordEncoder().encode(Constants.DEFAULT_PASSWORD));
        user.setEnable(true);
        userService.checkRepeatPhone(dto);
        userService.insert(user);
        return OK;
    }

    @OperationLog("删除用户")
    @RequestMapping("/delete")
    @ResponseBody
    public Result delete(@RequestParam Integer id) {
        userService.deleteLogically(id);
        return OK;
    }

    @OperationLog("用户重置密码")
    @RequestMapping("/resetPassword")
    @ResponseBody
    public Result resetPassword(@RequestParam Integer id) {
        User user = new User();
        user.setId(id);
        user.setPassword(new BCryptPasswordEncoder().encode(Constants.DEFAULT_PASSWORD));
        userService.updateSelective(user);
        return OK;
    }

    @RequestMapping("/get")
    @ResponseBody
    public Result get(@RequestParam Integer id) {
        return new JSONResult(userService.select(id));
    }


    @OperationLog("修改用户")
    @RequestMapping("/update")
    @ResponseBody
    public Result update(@Valid @RequestBody UserDto dto) {
        User user = DtoTransfer.userDto2Entity(dto);
        User old = userService.select(dto.getId());
        if(old.getPhone()!=null){
            if(!old.getPhone().equals(dto.getPhone())){
                userService.checkRepeatPhone(dto);
            }
        }else{
            userService.checkRepeatPhone(dto);
        }
        userService.updateSelective(user);
        return OK;
    }


    @RequestMapping("/role")
    @ResponseBody
    public Result role(@RequestParam Integer userId) {
        List<Role> all = roleService.selectAll();
        List<Role> selected = roleService.selectAllByUser(userId);
        JSONArray jsonArray = new JSONArray();
        for (Role role : all) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", role.getId());
            jsonObject.put("name", role.getName());
            jsonObject.put("selected", selected.contains(role));
            jsonArray.add(jsonObject);
        }
        return new JSONResult(jsonArray);
    }

    @OperationLog("授权用户")
    @RequestMapping("/role/save")
    @ResponseBody
    public Result saveRole(@Valid @RequestBody UserRoleDto userRoleDto) {
        userService.saveRoles(userRoleDto.getUserId(), userRoleDto.getRoleIds());
        return OK;
    }
}
