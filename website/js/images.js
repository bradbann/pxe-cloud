// post images --------------------------------------------------------------
function postImages(){
    
    var titleImage = document.querySelector("#postNameImage").value;
    var typeImage = document.querySelector("#postTypeImage").value;
    var imageSource = document.querySelector("#postImageSource").value;
    var kernelSource = document.querySelector("#postKernelSource").value;
    var repositoryUrl = document.querySelector("#postRepositoryUrl").value;
    var bootArgs = document.querySelector("#postBootArgs").value;
    
    $.ajax({
        type: "POST",
        url: "http://10.252.2.2:8001/images",
        data : {'title':titleImage, 
                'type': typeImage, 
                'image_source': imageSource,
                'kernel_source': kernelSource,
                'repository_url': repositoryUrl,
                'boot_args': bootArgs },
        
        
            }).done(function (response) {
                var answer = response.response;
                functionAlert(answer);
                    
    });
}


// delete image----------------------------------------------------

function deleteImage(){
    
    var idImage = document.querySelector("#deleteSelectImage").value;
            
    $.ajax({
        type: "DELETE",
        url: "http://10.252.2.2:8001/image/" + idImage,
             
        }).done(function (response) {
            var answer = response.response;
            functionAlert(answer);

         });

};

function deleteImageSelect(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://10.252.2.2:8001/images",
        "method": "GET",
        "headers": {}
    }

    $.ajax(settings).done(function (response) {

        var list = response.response;
        var len = response.response.length;
        
        for (var i = 0; i < len; i++ ) {
            newlink = document.createElement('option');
            newlink.setAttribute('value',list[i]['id']);                
            var t = document.createTextNode(list[i]['title']);
            newlink.appendChild(t);
            
            document.getElementById("deleteSelectImage").appendChild(newlink);
            
            
        ;}
    });
}

// Edit images --------------------------------------------------------------
function putImages(){
    
    var idImage = document.querySelector("#putSelectImage").value;
    var titleImage = document.querySelector('[value="' + idImage + '"]').textContent;
    var NewtitleImage = document.querySelector("#putNewNameImage").value;
    var typeImage = document.querySelector("#putTypeImage").value;
    var imageSource = document.querySelector("#putImageSource").value;
    var kernelSource = document.querySelector("#putKernelSource").value;
    var repositoryUrl = document.querySelector("#putRepositoryUrl").value;
    var bootArgs = document.querySelector("#putBootArgs").value;
    
    // if newgroup exist add newgroup at name group.
    if ( NewtitleImage.length > 1 ){
        titleImage = NewtitleImage
    }

    $.ajax({
        type: "PUT",
        url: "http://10.252.2.2:8001/image/" + idImage,
        data : {'title':titleImage, 
                'type': typeImage, 
                'image_source': imageSource,
                'kernel_source': kernelSource,
                'repository_url': repositoryUrl,
                'boot_args': bootArgs },
        
        
            }).done(function (response) {
                var answer = response.response;
                functionAlert(answer);
                    
    });
}

function putImageSelect(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://10.252.2.2:8001/images",
        "method": "GET",
        "headers": {}
    }

    $.ajax(settings).done(function (response) {

        var list = response.response;
        var len = response.response.length;
        
        for (var i = 0; i < len; i++ ) {
            newlink = document.createElement('option');
            newlink.setAttribute('value',list[i]['id']);                
            var t = document.createTextNode(list[i]['title']);
            newlink.appendChild(t);
            
            document.getElementById("putSelectImage").appendChild(newlink);
            
            
        ;}
    });
}



// get Images -----------------------------------------------------

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function getImages(){
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://10.252.2.2:8001/images",
        "method": "GET",
        "headers": {}
    }
    
    $.ajax(settings).done(function (response) {
  

        var list = response.response;
        var len = response.response.length;
        
        for (var i = 0; i < len; i++ ) {
                        
            var imageTitle = list[i]['title'];

            newlink = document.createElement('a');
            newlink.setAttribute('class',"list-group-item list-group-item-info mb-2");
            newlink.setAttribute('href', '#');
            newlink.setAttribute('id', imageTitle);
            var t = document.createTextNode(list[i]['title']);
            newlink.appendChild(t);
            document.getElementById("listImages").appendChild(newlink);
                 
                    
            newlink = document.createElement('a');
            newlink.setAttribute('class',"list-group-item  list-group-item-success ");                
            newlink.setAttribute('id', "items" + imageTitle);
            var t = document.createTextNode("Items");
            newlink.appendChild(t);
            document.getElementById(imageTitle).appendChild(newlink);    

            var itemList = ["type","image_source","kernel_source","repository_url","boot_args"];
                        
            for ( var x = 0; x < itemList.length; x++ ){
                var text = list[i][itemList[x]];
                
                if ( ! isBlank(text) ){
        
                    newlink = document.createElement('a');
                    newlink.setAttribute('class',"list-group-item  list-group-item-warning ");                
                    newlink.setAttribute('id', "items"+ itemList[x] + imageTitle);
                    var t = document.createTextNode(itemList[x]);
                    newlink.appendChild(t);
                    document.getElementById("items" + imageTitle).appendChild(newlink); 
                    
                    newlink = document.createElement('a');
                    newlink.setAttribute('class',"list-group-item  list-group-item-action ");                                        
                    var t = document.createTextNode(text);
                    newlink.appendChild(t);
                    document.getElementById("items" + itemList[x] + imageTitle).appendChild(newlink);

                }

            };
        };        
    });
};