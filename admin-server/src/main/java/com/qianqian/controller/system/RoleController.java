package com.qianqian.controller.system;

import com.github.pagehelper.PageInfo;
import com.qianqian.annotation.OperationLog;
import com.qianqian.controller.BaseController;
import com.qianqian.core.BusinessException;
import com.qianqian.core.ErrorCode;
import com.qianqian.core.JSONResult;
import com.qianqian.core.Result;
import com.qianqian.core.jqGrid.JqGridResult;
import com.qianqian.dto.DtoTransfer;
import com.qianqian.dto.PermissionDto;
import com.qianqian.dto.RoleDto;
import com.qianqian.dto.RoleJqGridParam;
import com.qianqian.entity.mysql.oauth.Role;
import com.qianqian.service.oauth.MenuService;
import com.qianqian.service.oauth.RoleService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * @author fonlin
 * @date 2018/4/25
 */
@Controller
@RequestMapping("/role")
public class RoleController extends BaseController {

    @Resource
    private RoleService roleService;
    @Resource
    private MenuService menuService;

    @RequestMapping("/list")
    public String list(Model model) {
        model.addAttribute("menus", getMenus("role"));
        return "/system/role/list";
    }

    @RequestMapping("/grid")
    @ResponseBody
    public Result grid(RoleJqGridParam param) {
        PageInfo<Role> pageInfo =  roleService.selectByPage(param);
        JqGridResult<Role> result = new JqGridResult<>();
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

    @OperationLog("新增角色")
    @RequestMapping("/insert")
    @ResponseBody
    public Result insert(@Valid @RequestBody RoleDto dto) {
        if (roleService.select("roleKey", dto.getRoleKey()) != null) {
            throw new BusinessException(ErrorCode.ROLE_KEY_EXIST);
        }
        Role role = DtoTransfer.roleDto2Entity(dto);
        roleService.insert(role);
        return OK;
    }

    @OperationLog("删除角色")
    @RequestMapping("/delete")
    @ResponseBody
    public Result delete(@RequestParam Integer id) {
        roleService.deleteLogically(id);
        return OK;
    }

    @RequestMapping("/get")
    @ResponseBody
    public Result get(@RequestParam Integer id) {
        return new JSONResult(roleService.select(id));
    }

    @OperationLog("修改角色")
    @RequestMapping("/update")
    @ResponseBody
    public Result update(@Valid @RequestBody RoleDto dto) {
        Role role = DtoTransfer.roleDto2Entity(dto);
        roleService.update(role);
        return OK;
    }

    @OperationLog("分配权限")
    @RequestMapping("/permission")
    @ResponseBody
    public Result permission(@RequestParam Integer roleId) {
        return new JSONResult(menuService.jstreeMenu(menuService.selectAllByRole(roleId)));
    }


    @OperationLog("保存权限")
    @RequestMapping(value = "/permission/save", method = RequestMethod.POST)
    @ResponseBody
    public Result savePermission(@Valid @RequestBody PermissionDto permissionDto) {
        roleService.savePermission(permissionDto.getId(), permissionDto.getCodes());
        return OK;
    }
}
