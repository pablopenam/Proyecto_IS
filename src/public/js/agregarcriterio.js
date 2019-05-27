$(document).on('ready', funcPrincipal);

function funcPrincipal(){
    $("#btnNuevoCriterio").on('click', funcNuevoCriterio);

}

function funcNuevoCriterio(){
    $("#tableRubrica")
    .append(
        $('<tr>')
        .append
        (
            $('<th>')
            .append(
                $('<input>').attr('type','text').addClass('form-control')
            )  
        )
        .append
        (
            $('<th>')
            .append(
                $('<input>').attr('type','text').addClass('form-control')
            )  
        )
        .append
        (
            $('<th>')
            .append(
                $('<input>').attr('type','text').addClass('form-control')
            )  
        )
        .append
        (
            $('<th>')
            .append(
                $('<input>').attr('type','text').addClass('form-control')
            )  
        )
        .append
        (
            $('<th>')
            .append(
                $('<input>').attr('type','text').addClass('form-control')
            )  
        )
        .append
        (
            $('<th>')
            .append(
                $('<input>').attr('type','text').addClass('form-control')
            )  
        )
        .append
        (
            $('<th>')
            .append(
                $('<input>').attr('type','text').addClass('form-control')
            )  
        )
    );

}