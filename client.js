// *************************************
// 簡易スマホチェック
// *************************************
jQuery.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
toastr.options={"closeButton":false,"debug":false,"newestOnTop":false,"progressBar":false,"positionClass":"toast-bottom-center","preventDuplicates":false,"onclick":null,"showDuration":"300","hideDuration":"1000","timeOut":"3000","extendedTimeOut":"1000","showEasing":"swing","hideEasing":"linear","showMethod":"fadeIn","hideMethod":"fadeOut"};
if ( !$.isMobile ) {
    toastr.options.positionClass = "toast-top-center";
}

$(function(){

    // INPUT type="file" のファイル選択後のイベント
    $("#target").on("change", function(){

        // 画像表示部分をクリア
        $("#image").html("");
        $("#result").html("");

        for( i = 0; i < this.files.length; i++ ) {

            console.dir(this.files[i]);

            // FileReader は毎回作成(同時に複数のファイルを扱えない)
            var reader = new FileReader();
            // オリジナルファイル名をプロパティとして追加しておく
            reader.name = this.files[i].name;
            reader.type = this.files[i].type;

            // FileReader に画像が読み込まれた時のイベント
            $(reader).on("load", function () {

                console.dir("type:"+this.type);

                if ( this.type.indexOf("image/") == 0 ) {
                    // div の中に img 要素を追加してその都度 this.result(ArrayBuffer) をセット
                    $("<img>").appendTo("#image")
                        .prop( {"src": this.result, "title": this.name + " : " + this.type } )
                        .css( {"width": "160px", "margin": "10px","border": "1px solid #c0c0c0" } );
                }
                else {
                    $("<img>").appendTo("#image")
                        .prop( {"src": "./notimage.png", "title": this.name + " : " + this.type } )
                        .css( {"width": "160px", "margin": "10px","border": "1px solid #c0c0c0" } );
                }
            });

            // 上記イベントを発動するための処理( this.files[i] は blob )
            if (this.files[i]) {
                // 画像を読み込み
                reader.readAsDataURL(this.files[i]);
            }
            
        }


    });
    
});
