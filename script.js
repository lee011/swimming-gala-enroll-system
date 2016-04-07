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
var idleTime = 0;
var idleWarningShown = false;
var loggedin = false;
$(function () {
    var idleInterval = setInterval(timerIncrement, 1000);

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
        if (idleWarningShown) {
            $("#modal7").closeModal();
            idleWarningShown = false;
        }
    });
    $(this).keypress(function (e) {
        idleTime = 0;
        if (idleWarningShown) {
            $("#modal7").closeModal();
            idleWarningShown = false;
        }
    });
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
                $("#abMainTitle").css("right", 96);
                setActionBarTitle(lang.title, "");
                setBackButtonVisible(false);
                $("#refreshState").fadeIn(200);
                lasthash = "";
                loadMainPage();
            } else if (h == "help") {
                $("#menuButton").hide();
                $("#refButton").css("right", 8);
                $("#abMainTitle").css("right", 56);
                setActionBarTitle(lang.title, lang.help_title);
                setBackButtonVisible(true);
                $("#refreshState").fadeIn(200);
                lasthash = "help";
                loadHelpPage();
            } else if (h == "about") {
                $("#menuButton").hide();
                $("#refButton").css("right", 8);
                $("#abMainTitle").css("right", 56);
                setActionBarTitle(lang.title, lang.about_title);
                setBackButtonVisible(true);
                $("#refreshState").fadeIn(200);
                lasthash = "about";
                loadAboutPage();
            } else {
                if (usertype != undefined && usertype != "") {
                    $("#menuButton").show();
                    $("#refButton").css("right", 48);
                    $("#abMainTitle").css("right", 96);
                    if (h == "events") {
                        if (usertype == "admin") {
                            setActionBarTitle(lang.title, lang.manage_ev_title);
                            setBackButtonVisible(true);
                            $("#refreshState").fadeIn(200);
                            lasthash = "events";
                            loadEventsPage();
                        } else {
                            Materialize.toast(lang.page_no_priv, 2000);
                            history.back();
                            c.currentTime = 0;
                            c.play();
                        }
                    } else if (h == "enroll") {
                        setActionBarTitle(lang.title, lang.enroll_title);
                        setBackButtonVisible(true);
                        $("#refreshState").fadeIn(200);
                        lasthash = "enroll";
                        loadEnrollPage();
                    } else if (h == "stat") {
                        setActionBarTitle(lang.title, lang.stat_title);
                        setBackButtonVisible(true);
                        $("#refreshState").fadeIn(200);
                        lasthash = "enroll";
                        loadStatPage();
                    } else if (h == "helper") {
                        setActionBarTitle(lang.title, lang.helper_title);
                        setBackButtonVisible(true);
                        $("#refreshState").fadeIn(200);
                        lasthash = "helper";
                        loadHelperPage();
                    } else if (h == "entries") {
                        if (usertype == "admin" || usertype == "helper") {
                            setActionBarTitle(lang.title, lang.manage_entry_title);
                            setBackButtonVisible(true);
                            $("#refreshState").fadeIn(200);
                            lasthash = "entries";
                            loadEntriesPage();
                        } else {
                            Materialize.toast(lang.page_no_priv, 2000);
                            history.back();
                            c.currentTime = 0;
                            c.play();
                        }
                    } else {
                        Materialize.toast(lang.no_fn_found, 2000);
                        history.back();
                        c.currentTime = 0;
                        c.play();
                    }
                } else {
                    Materialize.toast(lang.login_required, 2000);
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
            setActionBarTitle(lang.title, "");
            setBackButtonVisible(false);
            $("#refreshState").fadeIn(200);
            lasthash = "";
            loadMainPage();
        } else if (h == "help") {
            $("#menuButton").hide();
            $("#refButton").css("right", 8);
            setActionBarTitle(lang.title, lang.help_title);
            setBackButtonVisible(true);
            $("#refreshState").fadeIn(200);
            lasthash = "help";
            loadHelpPage();
        } else if (h == "about") {
            $("#menuButton").hide();
            $("#refButton").css("right", 8);
            setActionBarTitle(lang.title, lang.about_title);
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
                        setActionBarTitle(lang.title, lang.manage_ev_title);
                        setBackButtonVisible(true);
                        $("#refreshState").fadeIn(200);
                        lasthash = "events";
                        loadEventsPage();
                    } else {
                        Materialize.toast(lang.page_no_priv, 2000);
                        history.back();
                        c.currentTime = 0;
                        c.play();
                    }
                } else if (h == "enroll") {
                    setActionBarTitle(lang.title, lang.enroll_title);
                    setBackButtonVisible(true);
                    $("#refreshState").fadeIn(200);
                    lasthash = "enroll";
                    loadEnrollPage();
                } else if (h == "stat") {
                    setActionBarTitle(lang.title, lang.stat_title);
                    setBackButtonVisible(true);
                    $("#refreshState").fadeIn(200);
                    lasthash = "stat";
                    loadStatPage();
                } else if (h == "helper") {
                    setActionBarTitle(lang.title, lang.helper_title);
                    setBackButtonVisible(true);
                    $("#refreshState").fadeIn(200);
                    lasthash = "helper";
                    loadHelperPage();
                } else if (h == "entries") {
                    if (usertype == "admin" || usertype == "helper") {
                        setActionBarTitle(lang.title, lang.manage_entry_title);
                        setBackButtonVisible(true);
                        $("#refreshState").fadeIn(200);
                        lasthash = "entries";
                        loadEntriesPage();
                    } else {
                        Materialize.toast(lang.page_no_priv, 2000);
                        history.back();
                        c.currentTime = 0;
                        c.play();
                    }
                } else {
                    Materialize.toast(lang.no_fn_found, 2000);
                    history.back();
                    c.currentTime = 0;
                    c.play();
                }
            } else {
                Materialize.toast(lang.login_required, 2000);
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
            Materialize.toast(lang.all_fields_required, 2000);
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
                    Materialize.toast(lang.item_added, 2000);
                    loadEventsPage();
                    o.currentTime = 0;
                    o.play();
                } else if (d.success == 0) {
                    $("#refreshState").fadeOut(200);
                    if (d.error.code == 1062) {
                        Materialize.toast(lang.duplicate, 2000);
                        c.currentTime = 0;
                        c.play();
                    } else {
                        Materialize.toast(lang.error + '(' + d.error.code + ')' + d.error.message, 2000);
                        c.currentTime = 0;
                        c.play();
                    }
                } else if (d.success == -2) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast(lang.action_no_priv, 2000);
                    a.currentTime = 0;
                    a.play();
                }
            }).fail(function (e, f, g) {
                $("#refreshState").fadeOut(200);
                Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
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
                    Materialize.toast(lang.item_updated, 2000);
                    loadEnrollPage();
                    o.currentTime = 0;
                    o.play();
                } else if (d.success == 0) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast(lang.error + '(' + d.error.code + ')' + d.error.message, 2000);
                    a.currentTime = 0;
                    a.play();
                }
            }).fail(function (e, f, g) {
                $("#updateentry").removeClass("disabled");
                $("#refreshState").fadeOut(200);
                Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
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

    $(document).on("click", "#updatehelper:not(.disabled)", function () {
        $("#updatehelper").addClass("disabled");
        $("#refreshState").fadeIn(200);
        $.ajax({
            url: "handleHelper.html",
            data: {
                post: $("#selpost").val()
            },
            dataType: "json",
            method: "post",
            cache: false
        }).done(function (d) {
            $("#updatehelper").removeClass("disabled");
            if (d.success == 1) {
                Materialize.toast(lang.item_updated, 2000);
                loadHelperPage();
                o.currentTime = 0;
                o.play();
            } else if (d.success == 0) {
                $("#refreshState").fadeOut(200);
                Materialize.toast(lang.error + '(' + d.error.code + ')' + d.error.message, 2000);
                a.currentTime = 0;
                a.play();
            }
        }).fail(function (e, f, g) {
            $("#updatehelper").removeClass("disabled");
            $("#refreshState").fadeOut(200);
            Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
            a.currentTime = 0;
            a.play();
        });
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
                    Materialize.toast(lang.item_updated, 2000);
                    $("#refreshState").fadeOut(200);
                    o.currentTime = 0;
                    o.play();
                } else if (d.success == 0) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast(lang.error + '(' + d.error.code + ')' + d.error.message, 2000);
                    a.currentTime = 0;
                    a.play();
                }
            }).fail(function (e, f, g) {
                $("#refreshState").fadeOut(200);
                Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
                a.currentTime = 0;
                a.play();
            });
        } else {
            Materialize.toast(lang.duplicate_selection, 2000);
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
                    Materialize.toast(lang.login_success, 2000);
                    loadMainPage();
                    i.play();
                } else if (d.success == 0) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast(lang.login_error_pwd, 2000);
                    c.currentTime = 0;
                    c.play();
                } else if (d.success == -1) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast(lang.login_error_unknown, 2000);
                    a.currentTime = 0;
                    a.play();
                } else if (d.success == -2) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast(lang.login_error_missing_info, 2000);
                    b.currentTime = 0;
                    b.play();
                } else if (d.success == -3) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast(lang.login_error_not_ready, 2000);
                    c.currentTime = 0;
                    c.play();
                } else if (d.success == -4) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast(lang.login_error_verification, 2000);
                    console.log(d.error);
                    console.log(d.jsontext);
                    c.currentTime = 0;
                    c.play();
                } else if (d.success == -5) {
                    $("#refreshState").fadeOut(200);
                    Materialize.toast(lang.login_error_blocked, 2000);
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
            Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
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
            Materialize.toast(lang.logout, 2000);
            loadMainPage();
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
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
            Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
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
                Materialize.toast(lang.item_deleted, 2000);
                loadEventsPage();
            } else if (d.success == 0) {
                $("#refreshState").fadeOut(200);
                c.currentTime = 0;
                c.play();
                Materialize.toast(lang.error + '(' + d.error.code + ')' + d.error.message, 2000);
            } else if (d.success == -2) {
                $("#refreshState").fadeOut(200);
                c.currentTime = 0;
                c.play();
                Materialize.toast(lang.action_no_priv, 2000);
            }
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            a.currentTime = 0;
            a.play();
            Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
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
                Materialize.toast(lang.item_updated, 2000);
                loadEventsPage();
            } else if (d.success == 0) {
                $("#refreshState").fadeOut(200);
                c.currentTime = 0;
                c.play();
                Materialize.toast(lang.error + '(' + d.error.code + ')' + d.error.message, 2000);
            } else if (d.success == -2) {
                $("#refreshState").fadeOut(200);
                c.currentTime = 0;
                c.play();
                Materialize.toast(lang.action_no_priv, 2000);
            }
        }).fail(function (e, f, g) {
            $("#refreshState").fadeOut(200);
            a.currentTime = 0;
            a.play();
            Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
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
            if (x.status == 404) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.network_error, 2000);
            } else if (x.status == 500) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.system_error, 2000);
            } else {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.error + g, 2000);
            }
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
            if (x.status == 404) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.network_error, 2000);
            } else if (x.status == 500) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.system_error, 2000);
            } else {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.error + g, 2000);
            }
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
            if (x.status == 404) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.network_error, 2000);
            } else if (x.status == 500) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.system_error, 2000);
            } else {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.error + g, 2000);
            }
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
                Materialize.toast(lang.network_error, 2000);
            } else if (x.status == 403) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.timeout, 2000);
                location.replace("#");
            } else if (x.status == 500) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.system_error, 2000);
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
                Materialize.toast(lang.network_error, 2000);
            } else if (x.status == 403) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.timeout, 2000);
                location.replace("#");
            } else if (x.status == 500) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.system_error, 2000);
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
                Materialize.toast(lang.network_error, 2000);
            } else if (x.status == 403) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.timeout, 2000);
                location.replace("#");
            } else if (x.status == 500) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.system_error, 2000);
            }
            return false;
        });
    });
}

function loadHelperPage() {
    $("#actionBar").css("box-shadow", "rgba(0, 0, 0, 0.25) 0px 2px 1px 0px");
    $("#mainContent").fadeOut(200, function () {
        $.ajax({
            url: "helper.html",
            cache: false
        }).done(function (d) {
            $("#mainContent").html(d);
            $("#mainContent").fadeIn(200);
            $("#refreshState").fadeOut(200);
            $('.matsel').material_select();
            $('ul.tabs').tabs();
            $("#actionBar").css("box-shadow", "none");
            return true;
        }).fail(function (x, s, e) {
            if (x.status == 404) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.network_error, 2000);
            } else if (x.status == 403) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.timeout, 2000);
                location.replace("#");
            } else if (x.status == 500) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.system_error, 2000);
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
                Materialize.toast(lang.network_error, 2000);
            } else if (x.status == 403) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.timeout, 2000);
                location.replace("#");
            } else if (x.status == 500) {
                $("#refreshState").fadeOut(200);
                a.currentTime = 0;
                a.play();
                Materialize.toast(lang.system_error, 2000);
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
    $("#confirm").removeClass("disabled");
}

function captchaExp(value) {
    captchaValue = "";
    b.currentTime = 0;
    b.play();
    Materialize.toast(lang.verification_timeout, 2000);
    console.log("captcha expired");
    $("#confirm").addClass("disabled");
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
                $("#errortext").text(lang.lock_pwd_incorrect);
            }
        });
    } else {
        if ($('#lockpwdinp').val() == "") {
            c.currentTime = 0;
            c.play();
            $("#errortext").text(lang.lock_pwd_blank);
        } else if ($('#lockpwdinp').val().length < 6) {
            c.currentTime = 0;
            c.play();
            $("#errortext").text(lang.lock_pwd_length);
        } else {
            $('#lockpwd').val($('#lockpwdinp').val());
            $("#modal6").closeModal();
            $("#updateentry").click();
        }
    }
}

function timerIncrement() {
    if (loggedin) {
        idleTime++;
        if (idleTime > 599) {
            loggedin = false;
            $("#modal7").closeModal();
            idleWarningShown = false;
            $("#refreshState").fadeIn(200);
            $.ajax({
                url: "logout.html",
                cache: false
            }).done(function (d) {
                location.replace("#");
                o.play();
                usertype = "";
                captchaValue = "";
                Materialize.toast(lang.logout, 2000);
                loadMainPage();
            }).fail(function (e, f, g) {
                $("#refreshState").fadeOut(200);
                Materialize.toast(e.status == 404 ? lang.network_error : lang.error + g, 2000);
                a.currentTime = 0;
                a.play();
            })
            $("#modal8").openModal({
                in_duration: 200,
                out_duration: 100
            });
        } else if (idleTime > 479) {
            if (!idleWarningShown) {
                $("#modal7").openModal({
                    in_duration: 200,
                    out_duration: 100
                });
                idleWarningShown = true;
            }
            $("#idlecount").text(600 - idleTime);
        }
    }
}