package com.qianqian.controller.system;

import com.qianqian.annotation.OperationLog;
import com.qianqian.controller.BaseController;
import com.qianqian.core.BusinessException;
import com.qianqian.core.ErrorCode;
import com.qianqian.core.JSONResult;
import com.qianqian.core.Result;
import com.qianqian.dto.DtoTransfer;
import com.qianqian.dto.MenuDto;
import com.qianqian.entity.mysql.oauth.Menu;
import com.qianqian.service.oauth.MenuService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.Comparator;
import java.util.List;

/**
 * @author fonlin
 * @date 2018/5/2
 */
@Controller
@RequestMapping("/menu")
public class MenuController extends BaseController {

    @Resource
    private MenuService menuService;

    @RequestMapping("/list")
    public String list(Model model) {
        model.addAttribute("menus", getMenus("menu"));
        return "/system/menu/list";
    }

    @RequestMapping("/grid")
    @ResponseBody
    public List<Menu> grid() {
        List<Menu> menus = menuService.selectAll();
        menus.sort(Comparator.comparingInt(Menu::getSequence));
        return menus;
    }

    @RequestMapping("/jstree")
    @ResponseBody
    public Result jstree() {
        return new JSONResult(menuService.jstreeMenu(null));
    }

    @OperationLog("新增菜单")
    @RequestMapping("/insert")
    @ResponseBody
    public Result insert(@Valid @RequestBody MenuDto dto) {
        if (menuService.select("code", dto.getName()) != null) {
            throw new BusinessException(ErrorCode.BAD_REQUEST, "code不允许重复");
        }
        Menu menu = DtoTransfer.menuDto2Entity(dto);
        menu.setDisplayed(true);
        menuService.insert(menu);
        return OK;
    }

    @RequestMapping("/get")
    @ResponseBody
    public Result get(@RequestParam Integer id) {
        return new JSONResult(menuService.select(id));
    }

    @OperationLog("修改菜单")
    @RequestMapping("/update")
    @ResponseBody
    public Result update(@Valid @RequestBody MenuDto dto) {
        Menu menu = DtoTransfer.menuDto2Entity(dto);
        menuService.updateSelective(menu);
        return OK;
    }

    @OperationLog("删除菜单")
    @RequestMapping("/delete")
    @ResponseBody
    public Result delete(@RequestParam Integer id) {
        menuService.deleteLogically(id);
        return OK;
    }
}
