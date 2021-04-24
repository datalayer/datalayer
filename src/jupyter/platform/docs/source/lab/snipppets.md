---
title: JupyterLab Snippets
---

# JupyterLab Snippets

##  Generate Excel file in the workspace

```js
async saveBlob(filePath, blob){    	
    	var serviceManager = this.app.serviceManager;
    	var items = filePath.split('/');
    	var fileName = items.pop();
    	var directoryPath = items.join('/');
    	var extension = fileName.split('.').pop();
    	var options = {
    	  path: directoryPath,
          type: 'file',
          ext: extension,
          name: fileName
    	};

        var blobConversionReader = new FileReader();
        blobConversionReader.onload = async () => {
			var dataUrl = blobConversionReader.result;
			var base64 = dataUrl.split(',')[1];

			var file = await serviceManager.contents.newUntitled(options);
			var tempFilePath = file.path;
			    	
			file.content = base64; 
			file.name = fileName;
			file.path = filePath;
			file.format = 'base64';
			serviceManager.contents.save(filePath, file);
			
            await serviceManager.contents.delete(tempFilePath);  

		};
		blobConversionReader.readAsDataURL(blob); 
			
    }
```

## How to get content of file opend with FileDialog.getOpenFiles?

```js
const result = await dialog;
return await new Promise(async (resolve, reject)=>{	
			if(result.button.accept){
			  let files = result.value;
			  let file = files[0];
			  let url = document.URL + '/../files/' + file.path;			 
			  await fetch(url)
				  .then(async (result) => {					 
				      var blob = await result.blob();
					  resolve(blob);
				  })
				  .catch(error =>{
                        reject(error);
				  })
			  
			} else {
				resolve(null);
			}
			
    	});
```
