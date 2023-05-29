


window.addEventListener('DOMContentLoaded', () => {
  const fileList = document.getElementById('filelist');

  // Pasta contendo os arquivos
  const pasta = 'Arquivos';

  // Requisição AJAX para obter a lista de arquivos
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `listar_arquivos.php?dir=${pasta}`, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const files = JSON.parse(xhr.responseText);

      // Cria objetos com listas vazias para cada grupo de arquivo
      const groups = {
        images: [],
        documents: [],
        music: [],
        videos: [],
        executables: []
      };

      // Adiciona cada arquivo ao grupo correspondente
      files.forEach(file => {
        const extension = file.split('.').pop();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
          groups.images.push(file);
        } else if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
          groups.documents.push(file);
        } else if (extension === 'mp3') {
          groups.music.push(file);
        } else if (['mp4', 'avi', 'wmv', 'mov'].includes(extension)) {
          groups.videos.push(file);
        } else if (extension === 'exe') {
          groups.executables.push(file);
        }
      });

      // Adiciona a galeria de imagens ao DOM
      const imageGallery = document.createElement('div');
      imageGallery.classList.add('image-gallery');
      groups.images.forEach(file => {
        const link = document.createElement('a');
        link.href = `${pasta}/${file}`;
        const image = document.createElement('img');
        image.src = `${pasta}/${file}`;
        image.style.maxHeight = '100px';
        image.style.marginRight = '10px';
        link.appendChild(image);
        imageGallery.appendChild(link);
      });
      fileList.appendChild(imageGallery);

      // Adiciona cada grupo de arquivos ao DOM
      for (const key in groups) {
        if (Object.prototype.hasOwnProperty.call(groups, key)) {
          const fileListByGroup = document.createElement('ul');
          fileListByGroup.innerHTML = `<h2>${key.toUpperCase()}:</h2>`;
          groups[key].forEach(file => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `${pasta}/${file}`;
            link.textContent = file;
            listItem.appendChild(link);
            fileListByGroup.appendChild(listItem);
          });
          fileList.appendChild(fileListByGroup);
        }
      }
    }
  };
  xhr.send();
});


