$(document).ready(function() {
    $("#btn1").click(function() {
        $(".p1").hide(2000)
        $(".p1").addClass("box1").show(2000);
        $(".p2").hide(2000);
    })

    $("#btn2").click(function() {
        $(".p2").hide(2000)
        $(".p2").addClass("box2").show(2000);
        $(".p1").hide(2000);
    })
})