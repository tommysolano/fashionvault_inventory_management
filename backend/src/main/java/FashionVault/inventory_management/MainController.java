package FashionVault.inventory_management;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

    @GetMapping("/")
    @ResponseBody
    public String home() {
        return "Welcome to FashionVault Inventory Management!";
    }
}
