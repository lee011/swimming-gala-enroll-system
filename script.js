// JavaScript source code

var usertype;
var recaptchaAvailable = false;
location.hash = "";
var a = new Audio("err.wav");
var b = new Audio("notice.wav");
var c = new Audio("warn.wav");
var i = new Audio("in.wav");
var o = new Audio("out.wav");
var olocked = false;
$(function () {
    $("#refreshState").show();
    $.ajax({
        url: "login.html",
        cache: false
    }).done(function (d) {
        $("#mainContent").html(d);
        $("#mainContent").fadeIn(200);
        $("#refreshState").fadeOut(200);
    });
    $("#menuButton").show();
    var lasthash = "";
    $('#menuButton').dropdown({
        inDuration: 150,
        outDuration: 113,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'right' // Displays dropdown with edge aligned to the left of button
    });
    if (is.ie()) {
        $('#modal4').openModal({
            in_duration: 200,
            out_duration: 100
        });
    }
    var x = $(".dropdown-content li *");
    setInterval(function () {
        x.addClass("waves-effect");
    }, 1000);
    $(document).contextmenu(function (e) {
        if (location.hash.replace("#", "") != "help" && location.hash.replace("#", "") != "about") {
            $("#menuButton").click();
        }
        e.preventDefault();
    });
    $(window).on("hashchange", function () {
        if (is.ie()) {
            $('#modal4').openModal({
                in_duration: 200,
                out_duration: 100
            });
        }
        $("#actionBar").css("box-shadow", "rgba(0, 0, 0, 0.25) 0px 2px 1px 0px");
        var h = location.hash.replace("#", "");
        if (h != lasthash) {
            $("#modal1").closeModal();
            $("#modal2").closeModal();
            $("#modal3").closeModal();
            if (h == "") {
                $("#menuButton").show();
                $("#refButton").css("right", 48);
                setActionBarTitle("水運會報名系統 (測試版)", "");
                setBackButtonVisible(false);
                $("#refreshState").fadeIn(200);
                lasthash = "";
                loadMainPage();
            } else if (h == "help") {
                $("#menuButton").hide();
                $("#refButton").css("right", 8);
                setActionBarTitle("水運會報名系統 (測試版)", "說明");
                setBackButtonVisible(true);
                $("#refreshState").fadeIn(200);
                lasthash = "help";
                loadHelpPage();
            } else if (h == "about") {
                $("#menuButton").hide();
                $("#refButton").css("right", 8);
                setActionBarTitle("水運會報名系統 (測試版)", "關於");
                setBackButtonVisible(true);
                $("#refreshState").fadeIn(200);
                lasthash = "about";
                loadAboutPage();
            } else {
                if (usertype != undefined && usertype != "") {
                    $("#menuButton").show();
                    $("#refButton").css("right", 48);
                    if (h == "events") {
                        if (usertype == "admin") {
                            setActionBarTitle("水運會報名系統 (測試版)", "管理項目資料");
                            setBackButtonVisible(true);
                            $("#refreshState").fadeIn(200);
                            lasthash = "events";
                            loadEventsPage();
                        } else {
                            Materialize.toast('您沒有瀏覽此頁面的權限。', 2000);
                            history.back();
                            c.currentTime = 0;
                            c.play();
                        }
                    } else if (h == "enroll") {
                        setActionBarTitle("水運會報名系統 (測試版)", "報名");
                        setBackButtonVisible(true);
                        $("#refreshState").fadeIn(200);
                        lasthash = "enroll";
                        loadEnrollPage();
                    } else if (h == "stat") {
                        setActionBarTitle("水運會報名系統 (測試版)", "報名統計");
                        setBackButtonVisible(true);
                        $("#refreshState").fadeIn(200);
                        lasthash = "enroll";
                        loadStatPage();
                    } else if (h == "entries") {
                        if (usertype == "admin" || usertype == "helper") {
                            setActionBarTitle("水運會報名系統 (測試版)", "管理報名資料");
                            setBackButtonVisible(true);
                            $("#refreshState").fadeIn(200);
                            lasthash = "entries";
                            loadEntriesPage();
                        } else {
                            Materialize.toast('您沒有瀏覽此頁面的權限。', 2000);
                            history.back();
                            c.currentTime = 0;
                            c.play();
                        }
                    } else {
                        Materialize.toast('找不到相符的功能。', 2000);
                        history.back();
                        c.currentTime = 0;
                        c.play();
                    }
                } else {
                    Materialize.toast('請登入後再進行有關操作。', 2000);
                    history.back();
                    c.currentTime = 0;
                    c.play();
                }
            }
        }
    });


    $("#refButton").click(function () {
        if (is.ie()) {
            $('#modal4').openModal({
                in_duration: 200,
                out_duration: 100
            });
        }
        $("#actionBar").css("box-shadow", "rgba(0, 0, 0, 0.25) 0px 2px 1px 0px");
        var h = location.hash.replace("#", "");
        $("#modal1").closeModal();
        $("#modal2").closeModal();
        $("#modal3").closeModal();
        if (h == "") {
            $("#menuButton").show();
            $("#refButton").css("right", 48);
            setActionBarTitle("水運會報名系統 (測試版)", "");
            setBackButtonVisible(false);
            $("#refreshState").fadeIn(200);
            lasthash = "";
            loadMainPage();
        } else if (h == "help") {
            $("#menuButton").hide();
            $("#refButton").css("right", 8);
            setActionBarTitle("水運會報名系統 (測試版)", "說明");
            setBackButtonVisible(true);
            $("#refreshState").fadeIn(200);
            lasthash = "help";
            loadHelpPage();
        } else if (h == "about") {
            $("#menuButton").hide();
            $("#refButton").css("right", 8);
            setActionBarTitle("水運會報名系統 (測試版)", "關於");
            setBackButtonVisible(true);
            $("#refreshState").fadeIn(200);
            lasthash = "about";
            loadAboutPage();
        } else {
            if (usertype != undefined && usertype != "") {
                $("#menuButton").show();
                $("#refButton").css("right", 48);
                if (h == "events") {
                    if (usertype == "admin") {
                        setActionBarTitle("水運會報名系統 (測試版)", "管理項目資料");
                        setBackButtonVisible(true);
                        $("#refreshState").fadeIn(200);
                        lasthash = "events";
                        loadEventsPage();
                    } else {
                        Materialize.toast('您沒有瀏覽此頁面的權限。', 2000);
                        history.back();
                        c.currentTime = 0;
                        c.play();
                    }
                } else if (h == "enroll") {
                    setActionBarTitle("水運會報名系統 (測試版)", "報名");
                    setBackButtonVisible(true);
                    $("#refreshState").fadeIn(200);
                    lasthash = "enroll";
                    loadEnrollPage();
                } else if (h == "stat") {
                    setActionBarTitle("水運會報名系統 (測試版)", "報名統計");
                    setBackButtonVisible(true);
                    $("#refreshState").fadeIn(200);
                    lasthash = "enroll";
                    loadStatPage();
                } else if (h == "entries") {
                    if (usertype == "admin" || usertype == "helper") {
                        setActionBarTitle("水運會報名系統 (測試版)", "管理報名資料");
                        setBackButtonVisible(true);
                        $("#refreshState").fadeIn(200);
                        lasthash = "entries";
                        loadEntriesPage();
                    } else {
                        Materialize.toast('您沒有瀏覽此頁面的權限。', 2000);
                        history.back();
                        c.currentTime = 0;
                        c.play();
                    }
                } else {
                    Materialize.toast('找不到相符的功能。', 2000);
                    history.back();
                    c.currentTime = 0;
                    c.play();
                }
            } else {
                Materialize.toast('請登入後再進行有關操作。', 2000);
                history.back();
                c.currentTime = 0;
                c.play();
            }
        }
    });

    $("#backButton").click(function () {
        history.back();
    });

    $(document).on("click", "#cfull", function () {
        var elem = document.getElementById("chart");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    });

    $(document).on("click", "#addev", function () {
        if ($("#eid").val() == "" || $("#ename").val() == "" || $("#cname").val() == "") {
            c.currentTime = 0;
            c.play();
            Materialize.toast('請填寫所有欄位。', 2000);
        } else {
            $("#refreshState").fadeIn(200);
            $.ajax({
                url: "handleEvent.html?method=post",
                data: {
                    id: $("#eid").val(),
                    grade: $("#grade").val(),
                    ename: $("#ename").val(),
                    cname: $("#cname").val(),
                    type: $("#relay").prop("checked") ? "R" : "I",
                },
                dataType: "json",
                method: "post",
                cache: false
            }).done(function (d) {
                if (d.success == 1) {
                    Materialize.toast('已加入項目。', 2000);
                    loadEventsPage();
                    o.currentTime = 0;
                    o.play();
                } else if (d.success == 0) {
                    $("#refreshState").fadeOut(200);
                    if (d.error.code == 1062) {
                        Materialize.toast('項目重複，請檢查輸入並重試。', 2000);
                        c.currentTime = 0;
                        c.play();
                    } else {
                        Materialize.toast('發生不明的錯誤。請稍候再試: (' + d.error.code + ')' + d.error.message, 2000);
                        c.currentTime = 0;
                        c.play();
                    }
                } else if (d.success == -2) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast('您沒有執行此動作的權限。', 2000);
                    a.currentTime = 0;
                    a.play();
                }
            }).fail(function (e, f, g) {
                $("#refreshState").fadeOut(200);
                Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
                c.currentTime = 0;
                c.play();
            });
        }
    });

    $(document).on("click", "#updateentry:not(.disabled)", function () {
        if (checkUniqueEnroll()) {
            $("#updateentry").addClass("disabled");
            $("#refreshState").fadeIn(200);
            $.ajax({
                url: "handleEnroll.html",
                data: {
                    firstiev: $("#firstiev").val(),
                    secondiev: $("#secondiev").val(),
                    thirdiev: $("#thirdiev").val(),
                    rev: $("#rev").val().join(),
                    locked: $("#lockentry").prop("checked") ? "1" : '0',
                    lockpwd: $("#lockpwd").val()
                },
                dataType: "json",
                method: "post",
                cache: false
            }).done(function (d) {
                $("#updateentry").removeClass("disabled");
                if (d.success == 1) {
                    Materialize.toast('已更新項目。', 2000);
                    loadEnrollPage();
                    o.currentTime = 0;
                    o.play();
                } else if (d.success == 0) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast('發生不明的錯誤。請稍候再試: (' + d.error.code + ')' + d.error.message, 2000);
                    a.currentTime = 0;
                    a.play();
                }
            }).fail(function (e, f, g) {
                $("#updateentry").removeClass("disabled");
                $("#refreshState").fadeOut(200);
                Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
                a.currentTime = 0;
                a.play();
            });
        } else {
            $("#modal5").openModal({
                in_duration: 200,
                out_duration: 100
            });
            c.currentTime = 0;
            c.play();
        }
    });

    $(document).on("change", "#lockentry", function () {
        if (olocked) {
            if ($("#lockentry").prop("checked") == false) {
                $('#lockpwdinp').val('');
                $("#errortext").text("");
                $("#modal6").attr("data-mode", "validate");
                $("#modal6").openModal({
                    dismissible: false,
                    in_duration: 200,
                    out_duration: 100
                });
            }
        } else {
            if ($("#lockentry").prop("checked") == true) {
                $('#lockpwdinp').val('');
                $("#errortext").text("");
                $("#modal6").attr("data-mode", "create");
                $("#modal6").openModal({
                    dismissible: false,
                    in_duration: 200,
                    out_duration: 100
                });
            } else {
                $('#lockpwd').val("");
            }
        }
    });

    $(document).on("click", "#editent", function () {
        if (checkUniqueEnrollA()) {
            $("#refreshState").fadeIn(200);
            $.ajax({
                url: "handleEnrollA.html",
                data: {
                    firstiev: $("#afirstiev").val(),
                    secondiev: $("#asecondiev").val(),
                    thirdiev: $("#athirdiev").val(),
                    rev: $("#rev").val().join(),
                    id: $("#modal3").attr("data-id"),
                    locked: $("#alockentry").prop("checked") ? "1" : '0'
                },
                dataType: "json",
                method: "post",
                cache: false
            }).done(function (d) {
                if (d.success == 1) {
                    Materialize.toast('已更新項目。', 2000);
                    $("#refreshState").fadeOut(200);
                    o.currentTime = 0;
                    o.play();
                } else if (d.success == 0) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast('發生不明的錯誤。請稍候再試: (' + d.error.code + ')' + d.error.message, 2000);
                    a.currentTime = 0;
                    a.play();
                }
            }).fail(function (e, f, g) {
                $("#refreshState").fadeOut(200);
                Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
                a.currentTime = 0;
                a.play();
            });
        } else {
            Materialize.toast("選取項目重複。請檢查輸入並重試。", 2000);
            c.currentTime = 0;
            c.play();
        }
    });

    $(document).on("click", "#confirm:not(.disabled)", function () {
        $("#refreshState").fadeIn(200);
        $("#confirm").addClass("disabled");
        $("#u").prop("disabled", true);
        $("#u").material_select();
        $("#p").prop("disabled", true);
        $("#n").prop("disabled", true);
        $.ajax({
            url: "handleLogin.html",
            data: {
                u: $("#u").val(),
                p: $("#p").val(),
                n: $("#n").val(),
                c: captchaValue
            },
            dataType: "json",
            method: "post",
            cache: false
        }).done(function (d) {
            if (typeof d == 'string') {
                console.log(d);
            } else {
                $("#confirm").removeClass("disabled");
                $("#u").prop("disabled", false);
                $("#u").material_select();
                $("#p").prop("disabled", false);
                $("#n").prop("disabled", false);
                if (d.success == 1) {
                    usertype = d.type;
                    Materialize.toast('登入成功。正在為您載入主頁面...', 2000);
                    loadMainPage();
                    i.play();
                } else if (d.success == 0) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast('用戶名稱或密碼錯誤。', 2000);
                    c.currentTime = 0;
                    c.play();
                } else if (d.success == -1) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast('發生不明的錯誤。請稍候再試。', 2000);
                    a.currentTime = 0;
                    a.play();
                } else if (d.success == -2) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast('請輸入用戶名稱、輸入密碼及完成人機驗證。', 2000);
                    b.currentTime = 0;
                    b.play();
                } else if (d.success == -3) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast('您的帳號資料仍未準備好，請稍候再試。', 2000);
                    c.currentTime = 0;
                    c.play();
                } else if (d.success == -4) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast('人機驗證失敗，請稍後再試。', 2000);
                    console.log(d.error);
                    console.log(d.jsontext);
                    c.currentTime = 0;
                    c.play();
                }
            }
        }).fail(function (e, f, g) {
            $("#confirm").removeClass("disabled");
            $("#u").prop("disabled", false);
            $("#p").prop("disabled", false);
            $("#refreshState").fadeOut(200);
            console.log(e.responseText);
            Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
            a.currentTime = 0;
            a.play();
        })
    });

    $(document).on("click", "#logoutLink", function () {
        $("#refreshState").fadeIn(200);
        $.ajax({
            url: "logout.html",
            cache: false
        }).done(function (d) {
            o.play();
            usertype = "";
            captchaValue = "";
            Materialize.toast('您已經登出。', 2000);
            loadMainPage();
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
            a.currentTime = 0;
            a.play();
        })
    });

    $(document).on("click", "#selent", function () {
        $("#refreshState").fadeIn(200);
        $.ajax({
            url: "editEntry.html",
            cache: false,
            method: "post",
            data: {
                cls: $("#cls").val(),
                num: $("#num").val()
            }
        }).done(function (d) {
            $("#entryDetails").html(d);
            $("#refreshState").fadeOut(200);
            $(".matsel").material_select();
            $('#modal3').openModal({
                in_duration: 200,
                out_duration: 100
            });
        })
    });

    $(document).on("change", "#firstiev", function () {
        $('.matsel').material_select('destroy');
        if ($("#firstiev").val() == "") {
            $("#firstiev").val($("#secondiev").val());
            $("#secondiev").val($("#thirdiev").val());
            $("#thirdiev").val("");
            if ($("#firstiev").val() == "") {
                $("#secondiev").prop("disabled", true);
            }
            if ($("#secondiev").val() == "") {
                $("#thirdiev").prop("disabled", true);
            }
        } else {
            $("#secondiev").prop("disabled", false);
        }
        $('.matsel').material_select();
    });

    $(document).on("change", "#secondiev", function () {
        $('.matsel').material_select('destroy');
        if ($("#secondiev").val() == "") {
            $("#secondiev").val($("#thirdiev").val());
            $("#thirdiev").val("");
            if ($("#secondiev").val() == "") {
                $("#thirdiev").prop("disabled", true);
            }
        } else {
            $("#thirdiev").prop("disabled", false);
        }
        $('.matsel').material_select();
    });

    $(document).on("change", "#afirstiev", function () {
        $('.matsel').material_select('destroy');
        if ($("#afirstiev").val() == "") {
            $("#afirstiev").val($("#asecondiev").val());
            $("#asecondiev").val($("#athirdiev").val());
            $("#athirdiev").val("");
            if ($("#afirstiev").val() == "") {
                $("#asecondiev").prop("disabled", true);
            }
            if ($("#asecondiev").val() == "") {
                $("#athirdiev").prop("disabled", true);
            }
        } else {
            $("#asecondiev").prop("disabled", false);
        }
        $('.matsel').material_select();
    });

    $(document).on("change", "#asecondiev", function () {
        $('.matsel').material_select('destroy');
        if ($("#asecondiev").val() == "") {
            $("#asecondiev").val($("#thirdiev").val());
            $("#athirdiev").val("");
            if ($("#asecondiev").val() == "") {
                $("#athirdiev").prop("disabled", true);
            }
        } else {
            $("#athirdiev").prop("disabled", false);
        }
        $('.matsel').material_select();
    });

    $(document).on("click", ".delete-link", function () {
        $("#modal2").attr("data-id", $(this).attr("data-id"));
        $("#refreshState").fadeIn(200);
        $.ajax({
            url: "eventDetails.html",
            data: {
                id: $(this).attr("data-id")
            },
            dataType: "json",
            method: "post",
            cache: false
        }).done(function (d) {
            $("#eeid").removeClass("active");
            $("#eename").removeClass("active");
            $("#ecname").removeClass("active");
            $("#eeid").val(d.id);
            $("#egrade").val(d.grade);
            $("#eename").val(d.ename);
            $("#ecname").val(d.cname);
            $("#eeid").addClass("active");
            $("#eename").addClass("active");
            $("#ecname").addClass("active");
            $("#erelay").prop("checked", d.type == "R");
            $("#modal2").openModal({
                in_duration: 200,
                out_duration: 100
            });
            $("#refreshState").fadeOut(200);
            $('#egrade').material_select();
            $('#eeid').characterCounter();
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            a.currentTime = 0;
            a.play();
            Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
        });
    });

    $(document).on("click", "#refEvents", function () {
        $("#refreshState").fadeIn(200);
        loadEventsPage();
    });

    $(document).on("click", "#refEnroll", function () {
        $("#refreshState").fadeIn(200);
        loadEnrollPage();
    });

    $(document).on("click", "#refStat", function () {
        $("#refreshState").fadeIn(200);
        loadStatPage();
    });

    $(document).on("click", "#delev", function () {
        c.currentTime = 0;
        c.play();
        $("#deleid").text($("#modal2").attr("data-id"));
        $("#modal1").attr("data-id", $("#modal2").attr("data-id"));
        $("#modal2").closeModal();
        $('#modal1').openModal({
            in_duration: 200,
            out_duration: 100
        });
    });

    $("#modal1 .no-btn").click(function () {
        $("#modal2").openModal({
            in_duration: 200,
            out_duration: 100
        });
    });

    $("#modal1 .yes-btn").click(function () {
        $("#refreshState").fadeIn(200);
        $.ajax({
            url: "handleEvent.html?method=delete",
            data: {
                id: $("#modal1").attr("data-id")
            },
            dataType: "json",
            method: "post",
            cache: false
        }).done(function (d) {
            if (d.success == 1) {
                o.currentTime = 0;
                o.play();
                Materialize.toast('已刪除項目。', 2000);
                loadEventsPage();
            } else if (d.success == 0) {
                $("#refreshState").fadeOut(200);
                c.currentTime = 0;
                c.play();
                Materialize.toast('發生不明的錯誤。請稍候再試: (' + d.error.code + ')' + d.error.message, 2000);
            } else if (d.success == -2) {
                $("#refreshState").fadeOut(200);
                c.currentTime = 0;
                c.play();
                Materialize.toast('您沒有執行此動作的權限。', 2000);
            }
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            a.currentTime = 0;
            a.play();
            Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
        });
    });

    $("#editev").click(function () {
        $("#refreshState").fadeIn(200);
        console.log($("#erelay").prop("checked") ? "R" : "I");
        $.ajax({
            url: "handleEvent.html?method=put",
            data: {
                id: $("#modal2").attr("data-id"),
                grade: $("#egrade").val(),
                ename: $("#eename").val(),
                cname: $("#ecname").val(),
                type: $("#erelay").prop("checked") ? "R" : "I",
            },
            dataType: "json",
            method: "post",
            cache: false
        }).done(function (d) {
            if (d.success == 1) {
                o.currentTime = 0;
                o.play();
                console.log(d.q);
                Materialize.toast('已更新項目。', 2000);
                loadEventsPage();
            } else if (d.success == 0) {
                $("#refreshState").fadeOut(200);
                c.currentTime = 0;
                c.play();
                Materialize.toast('發生不明的錯誤。請稍候再試: (' + d.error.code + ')' + d.error.message, 2000);
            } else if (d.success == -2) {
                $("#refreshState").fadeOut(200);
                c.currentTime = 0;
                c.play();
                Materialize.toast('您沒有執行此動作的權限。', 2000);
            }
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            a.currentTime = 0;
            a.play();
            Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
        });
    });
});

function checkUniqueEnroll() {
    var ret = true;
    if ($("#firstiev").val() != "") {
        if ($("#secondiev").val() != "" && $("#firstiev").val() == $("#secondiev").val()) ret = false;
        if ($("#thirdiev").val() != "" && $("#firstiev").val() == $("#thirdiev").val()) ret = false;
    }
    if ($("#secondiev").val() != "") {
        if ($("#thirdiev").val() != "" && $("#secondiev").val() == $("#thirdiev").val()) ret = false;
    }
    return ret;
}

function checkUniqueEnrollA() {
    var ret = true;
    if ($("#afirstiev").val() != "") {
        if ($("#asecondiev").val() != "" && $("#afirstiev").val() == $("#asecondiev").val()) ret = false;
        if ($("#athirdiev").val() != "" && $("#afirstiev").val() == $("#athirdiev").val()) ret = false;
    }
    if ($("#asecondiev").val() != "") {
        if ($("#athirdiev").val() != "" && $("#asecondiev").val() == $("#athirdiev").val()) ret = false;
    }
    return ret;
}

function loadMainPage() {
    $("#mainContent").fadeOut(200, function () {
        $.ajax({
            url: "login.html",
            cache: false
        }).done(function (d) {
            $("#mainContent").html(d);
            $("#mainContent").fadeIn(200);
            $("#refreshState").fadeOut(200);
            $('.tooltipped').tooltip({ delay: 50 });
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            a.currentTime = 0;
            a.play();
            Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
        });

    });
}

function loadHelpPage() {
    $("#mainContent").fadeOut(200, function () {
        $.ajax({
            url: "help.html",
            cache: false
        }).done(function (d) {
            $("#mainContent").html(d);
            $("#mainContent").fadeIn(200);
            $("#refreshState").fadeOut(200);
            $('.collapsible').collapsible({ accordion: true });
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            a.currentTime = 0;
            a.play();
            Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
        });
    });
}

function loadAboutPage() {
    $("#mainContent").fadeOut(200, function () {
        $.ajax({
            url: "about.html",
            cache: false
        }).done(function (d) {
            $("#mainContent").html(d);
            $("#mainContent").fadeIn(200);
            $("#refreshState").fadeOut(200);
            $('.collapsible').collapsible({ accordion: true });
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            a.currentTime = 0;
            a.play();
            Materialize.toast(e.status == 404 ? "網l絡錯誤。請檢查您的網路連線，然後再試一次。" : '發生不明的錯誤。請稍候再試: ' + g, 2000);
        });
    });
}

function loadEventsPage() {
    $("#actionBar").css("box-shadow", "rgba(0, 0, 0, 0.25) 0px 2px 1px 0px");
    $("#mainContent").fadeOut(200, function () {
        $.ajax({
            url: "events.html",
            cache: false
        }).done(function (d) {
            $("#mainContent").html(d);
            $("#mainContent").fadeIn(200);
            $("#refreshState").fadeOut(200);
            $('#grade').material_select();
            $('#eid').characterCounter();
            $('ul.tabs').tabs();
            $("#actionBar").css("box-shadow", "none");
            $('.tooltipped').tooltip({ delay: 50 });
            return true;
        }).fail(function (x, s, e) {
            if (x.status == 404) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast("網l絡錯誤。請檢查您的網路連線，然後再試一次。", 2000);
            } else if (x.status == 403) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast("登入逾時。請重新登入。", 2000);
                location.replace("#");
            }
            return false;
        });
    });
}

function loadEntriesPage() {
    $("#actionBar").css("box-shadow", "rgba(0, 0, 0, 0.25) 0px 2px 1px 0px");
    $("#mainContent").fadeOut(200, function () {
        $.ajax({
            url: "entries.html",
            cache: false
        }).done(function (d) {
            $("#mainContent").html(d);
            $("#mainContent").fadeIn(200);
            $("#refreshState").fadeOut(200);
            $('#cls').material_select();
            $('.tooltipped').tooltip({ delay: 50 });
            return true;
        }).fail(function (x, s, e) {
            if (x.status == 404) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast("網l絡錯誤。請檢查您的網路連線，然後再試一次。", 2000);
            } else if (x.status == 403) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast("登入逾時。請重新登入。", 2000);
                location.replace("#");
            }
            return false;
        });
    });
}

function loadStatPage() {
    $("#actionBar").css("box-shadow", "rgba(0, 0, 0, 0.25) 0px 2px 1px 0px");
    $("#mainContent").fadeOut(200, function () {
        $.ajax({
            url: "stat.html",
            cache: false
        }).done(function (d) {
            $("#mainContent").html(d);
            $("#mainContent").fadeIn(200);
            $("#refreshState").fadeOut(200);
            return true;
        }).fail(function (x, s, e) {
            if (x.status == 404) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast("網l絡錯誤。請檢查您的網路連線，然後再試一次。", 2000);
            } else if (x.status == 403) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast("登入逾時。請重新登入。", 2000);
                location.replace("#");
            }
            return false;
        });
    });
}

function loadEnrollPage() {
    $("#actionBar").css("box-shadow", "rgba(0, 0, 0, 0.25) 0px 2px 1px 0px");
    $("#mainContent").fadeOut(200, function () {
        $.ajax({
            url: "enroll.html",
            cache: false
        }).done(function (d) {
            $("#mainContent").html(d);
            $("#mainContent").fadeIn(200);
            $("#refreshState").fadeOut(200);
            $('.matsel').material_select();
            $('ul.tabs').tabs();
            $("#actionBar").css("box-shadow", "none");
            $('.tooltipped').tooltip({ delay: 50 });
            return true;
        }).fail(function (x, s, e) {
            if (x.status == 404) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast("網l絡錯誤。請檢查您的網路連線，然後再試一次。", 2000);
            } else if (x.status == 403) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast("登入逾時。請重新登入。", 2000);
                location.replace("#");
            }
            return false;
        });
    });
}

function setActionBarTitle(main, sub) {
    $("#abMainTitle").text(main);
    $("#abSubTitle").text(sub);
    if (sub == "") {
        $("#abMainTitle").animate({ "top": 18 }, { queue: false, duration: 200 });
        $("#abSubTitle").fadeOut(200);
    } else {
        $("#abMainTitle").animate({ "top": 6 }, { queue: false, duration: 200 });
        $("#abSubTitle").fadeIn(200);
    }
}

function setBackButtonVisible(value) {
    if (value) {
        $("#backButton").css({ left: 0 });
        $("#abMainTitle").animate({ "left": 58 }, { queue: false, duration: 175 });
        $("#abSubTitle").animate({ "left": 58 }, { queue: false, duration: 175 });
    } else {
        $("#backButton").css({ left: -56 });
        $("#abMainTitle").animate({ "left": 12 }, { queue: false, duration: 175 });
        $("#abSubTitle").animate({ "left": 12 }, { queue: false, duration: 175 });
    }
}

var captchaValue = "";

var onloadCallback = function () {
    recaptchaAvailable = true;
    if (recaptchacontainer) {
        grecaptcha.render(recaptchacontainer, { "sitekey": "6LcbNxMTAAAAAJqw8rngqBFCofxVjUNdfzay7Rxj", callback: tryCaptcha, "expired-callback": captchaExp, type: "audio" });
    }
};

function tryCaptcha(value) {
    captchaValue = value;
    console.log(value);
}

function captchaExp(value) {
    captchaValue = "";
    b.currentTime = 0;
    b.play();
    Materialize.toast("人機驗證已過期，請重新勾選 [我不是自動程式] 選框。", 2000);
    console.log("captcha expired");
}

function checkLockPwd() {
    if (olocked) {
        $("#validatinglockpwd").show();
        $.ajax({
            url: "checklockpwd.html",
            data: {
                pwd: $('#lockpwdinp').val()
            },
            dataType: "json",
            method: "post",
            cache: false
        }).done(function (d) {
            $("#validatinglockpwd").hide();
            if (d.success == 1) {
                $("#modal6").closeModal();
                $("#updateentry").click();
            } else {
                c.currentTime = 0;
                c.play();
                $("#errortext").text("密碼錯誤。");
            }
        });
    } else {
        if ($('#lockpwdinp').val() == "") {
            c.currentTime = 0;
            c.play();
            $("#errortext").text("鎖定密碼不可為空白。");
        } else if ($('#lockpwdinp').val().length < 6) {
            c.currentTime = 0;
            c.play();
            $("#errortext").text("鎖定密碼的長度必須至少為 6。");
        } else {
            $('#lockpwd').val($('#lockpwdinp').val());
            $("#modal6").closeModal();
            $("#updateentry").click();
        }
    }
}