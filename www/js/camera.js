window.onload =  function inicio() {		
	iniciaBoton();
	iniciaFastClick();
	
	function iniciaFastClic(){			
		if('addEventListener' in document){				
			document.addEventListener('DOMContentLoaded',
				function(){															
					FastClick.attach(document.body);															
				}, false
			);			
		}		
	}
	function iniciaBoton (){		
		var ButtonAction=document.querySelector('#button-action');
		ButtonAction.addEventListener('click',function(){
			cargarFoto(Camera.PictureSourceType.CAMERA);
		});
		
		var filterButtons=document.querySelectorAll('.button-filter');
		filterButtons[0].addEventListener('click',function(){
			aplicaFiltro('gray');
		});
		filterButtons[1].addEventListener('click',function(){
			aplicaFiltro('negative');
		});
		filterButtons[2].addEventListener('click',function(){
			aplicaFiltro('sepia');
		});
		
		var buttonGallery=document.querySelector('#button-gallery');
		buttonGallery.addEventListener('click',function(){
			cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
		});
		
		var buttonSavePhoto=document.querySelector('#button-savePhoto');
		buttonSavePhoto.addEventListener('click',function(){
			guardarFoto();
		});
	} 
	
	function cargarFoto(pictureSourceType){		
		var opciones={
			quality: 100,
			sourceType: pictureSourceType,
			saveToPhotoAlbum: true,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: 300,
			targetHeight:300,
			cameraDirection:1,  //1, camara frontal, 0 camara posterior.			
			//saveToPhotoAlbum: true, //graba directamente a la camara cuando se toma la foto.
			correctOrientation: true
		};		
		navigator.camera.getPicture(fotoCargada,errorAlCargarFoto,opciones); //accede a la camara o galeria.
	}
	
	function fotoCargada(imageURI){		
		var img=document.createElement('img');
		img.onload=function(){
			pintarFoto(img);
		}
		img.src=imageURI;		
	}
	function pintarFoto(img){
		var canvas=document.querySelector('#foto');
		var context=canvas.getContext('2d');
		
		canvas.width=img.width;
		canvas.height=img.height;
		context.drawImage(img,0,0,img.width,img.height);
	}
	
	function errorAlCargarFoto(message){
		conole.log('Fallo al tomar/cargar foto o accion cancelada: '+ message);
	}	
	
	function aplicaFiltro(filterName){
		var canvas=document.querySelector('#foto');
		var context=canvas.getContext('2d');
		imageData=context.getImageData(0,0,canvas.width,canvas.height);
		
		effects[filterName](imageData.data);
		context.putImageData(imageData,0,0);
	}

}

/*
var app={
	inicio function(){
		//this.iniciaFastClick();
		this.iniciaBoton();
	},
	iniciaFastClick: function(){
		FastClick.attach(docuement.body);
	},
	iniciaBoton: function(){
		var ButtonAction=document.querySelector('#button-action');
		ButtonAction.addEventListener('click',this.tomarFoto);
	},
	tomarFoto: function(){
		var opciones={
			quality: 100,
			cameraDirection: 0,
			navigator.camera.getPicture(onPhotoDataSuccess
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: 300,
			targetHeight:300,
			correctOrientation: true
		};
		navigator.camera.getPicture(app.fotoTomada,app.errorAlTomarFoto,opciones);
	},
	fotoTomada: function(imageURI){
		var image = docuement.querySelector('#foto');
		image.src=imageURI;
	},
	errorAlTomarFoto: function(){
		conole.log('Fallo al tomar foto o toma cancelada: '+ message);
	}	
};
app.inicio();
*/