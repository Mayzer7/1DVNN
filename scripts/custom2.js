const app = {
    metrikaId: 102381846,
    bindTopBtn: function(){
        let self = this;
        $(document).on("click", ".main_slider_container .fancybox.btn", function(){
            console.log('click');
            self.reachGoal('btn_click');
        })
    },
    reachGoal: function(name){
        console.log('reached ' + name + ' ' + this.metrikaId);
        ym(this.metrikaId, 'reachGoal', name);
    },
    bindFirstSliderBtnClick: function(){
        //клик по кнопке "подробнее" первого слайда баннера
        let self = this;
        $(document).on("click", "[data-test-slider] [data-slide='1'] .fancybox.btn", function(){
            self.reachGoal('click_first_slide_btn');
        })
    },
    bindFirstSliderImageClick: function(){
        //клик по самой ссылке-картинке первого слайда баннера
        let self = this;
        $(document).on("click", "[data-test-slider] [data-slide='1'] [data-image-click]", function(){
            self.reachGoal('click_first_slide');
        })
    },
    bindAdvZhkMouseenter: function(){
        let self = this;
        $(document).on("mouseenter", "[data-adv-zhk-block] a.item", function(){
            self.reachGoal('adv_mouseenter');
        })
    },
    bindAdvZhkClick: function(){
        let self = this;
        $(document).on("click", "[data-adv-zhk-block] a.item", function(){
            self.reachGoal('adv_click');
        })
    },
    bindYmetrikaClick: function(){
        let self = this;
        $(document).on("click", "[data-yandex-metrika]", function(){
            let goal = $(this).data("yandexMetrika");
            self.reachGoal(goal);
        })
    },
    initVarioqub: function(){
        this.getVarioqubFlags();
        this.bindTopBtn();
        this.bindFirstSliderBtnClick();
        this.bindFirstSliderImageClick();
        this.bindAdvZhkMouseenter();
        this.bindAdvZhkClick();
        this.bindYmetrikaClick();
    },
    getVarioqubFlags: function(){
        let self = this;
        ymab(
            'metrika.' + self.metrikaId,
            'getFlags',
            function (flags) {
                self.processFlags(flags);
            }
        );
    },
    processFlags: function(flags){
        console.log('flags process');
        console.log(flags);
        /*
        switch(true) {
            case flags.first_slide !== "undefined":
                $(document).find("[data-test-slider] [data-slide='1'] .fancybox.btn")
                    .css({
                        'backgroundColor': '#559955',
                        'fontSize': '20px',
                        'fontWeight': '700',
                    });
                break;
            default:
                break;
        }
        */
    },
    init: function(){
        this.initVarioqub();
        console.log('app init');
    }
};

$(document).ready(function(){
    app.init();
})