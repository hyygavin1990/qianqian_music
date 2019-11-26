<div class="row border-bottom">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
        </div>
        <ul class="nav navbar-top-links navbar-right">
            <li>
                <span class="m-r-sm text-muted welcome-message">Welcome to 外呼管理系统.</span>
            </li>

            <li>
                <a href="/logout">
                    <i class="fa fa-sign-out"></i> Log out
                </a>
            </li>
        </ul>

    </nav>
    <input type="hidden" value='${permissions}' id="permissions"/>
    <script>
        window.localStorage.setItem("permissions", document.getElementById("permissions").value);
    </script>
</div>