


window.addEventListener('DOMContentLoaded', () => {
  const fileList = document.getElementById('filelist');
  const searchBox = document.getElementById('searchbox');

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
        Images: [],
        Videos: [],
        Musicas: [],
        Documentos: [],
        Executaveis: [],
        Zip: [],
        SistemasOperacionais: []
      };

      // Adiciona cada arquivo ao grupo correspondente
      files.forEach(file => {
        const extension = file.split('.').pop();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
          groups.Images.push(file);
        } else if (['mp4', 'avi', 'wmv', 'mov'].includes(extension)) {
          groups.Videos.push(file);
        } else if (extension === 'mp3') {
          groups.Musicas.push(file);
        } else if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'ino'].includes(extension)) {
          groups.Documentos.push(file);
        } else if (extension === 'exe') {
          groups.Executaveis.push(file);
        } else if (extension === 'zip') {
          groups.Zip.push(file);
        } else if (extension === 'iso') {
          groups.SistemasOperacionais.push(file);
        }
      });

      // Adiciona a galeria de fotos ao DOM
      const imageGallery = document.createElement('div');
      imageGallery.classList.add('image-gallery');
      const fotosTitle = document.createElement('h2');
      fotosTitle.textContent = 'Galeria de Fotos';
      imageGallery.appendChild(fotosTitle);
      groups.Images.forEach(file => {
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

      // Adiciona a galeria de vídeos ao DOM
      const videoGallery = document.createElement('div');
      videoGallery.classList.add('video-gallery');
      const videosTitle = document.createElement('h2');
      videosTitle.textContent = 'Videos';
      videoGallery.appendChild(videosTitle);
      groups.Videos.forEach(file => {
        const extension = file.split('.').pop();
        const link = document.createElement('a');
        link.href = `${pasta}/${file}`;
        link.style.display = 'block';
        link.style.marginBottom = '10px';
        if (['mp4', 'avi', 'wmv', 'mov'].includes(extension)) {
          // Adiciona miniatura do vídeo na lista
          const video = document.createElement('video');
          video.src = `${pasta}/${file}`;
          video.controls = true;
          video.style.maxHeight = '250px';
          link.appendChild(video);
        } else {
          link.textContent = file;
        }
        videoGallery.appendChild(link);
      });
      fileList.appendChild(videoGallery);

      // Adiciona a galeria de músicas ao DOM
      const musicGallery = document.createElement('div');
      musicGallery.classList.add('music-gallery');
      const musicasTitle = document.createElement('h2');
      musicasTitle.textContent = 'Musicas';
      musicGallery.appendChild(musicasTitle);
      groups.Musicas.forEach(file => {
        const link = document.createElement('a');
        link.href = `${pasta}/${file}`;
        link.textContent = file;
        const listItem = document.createElement('li');
        listItem.appendChild(link);
        musicGallery.appendChild(listItem);
      });
      fileList.appendChild(musicGallery);

      // Adiciona a galeria de documentos ao DOM
      const documentGallery = document.createElement('div');
      documentGallery.classList.add('document-gallery');
      const documentosTitle = document.createElement('h2');
      documentosTitle.textContent = 'Documentos';
      documentGallery.appendChild(documentosTitle);
      groups.Documentos.forEach(file => {
        const link = document.createElement('a');
        link.href = `${pasta}/${file}`;
        link.textContent = file;
        const listItem = document.createElement('li');
        listItem.appendChild(link);
        documentGallery.appendChild(listItem);
      });
      fileList.appendChild(documentGallery);

      // Adiciona a galeria de executáveis ao DOM
      const executableGallery = document.createElement('div');
      executableGallery.classList.add('executable-gallery');
      const executaveisTitle = document.createElement('h2');
      executaveisTitle.textContent = 'Executaveis';
      executableGallery.appendChild(executaveisTitle);
      groups.Executaveis.forEach(file => {
        const link = document.createElement('a');
        link.href = `${pasta}/${file}`;
        link.textContent = file;
        const listItem = document.createElement('li');
        listItem.appendChild(link);
        executableGallery.appendChild(listItem);
      });
      fileList.appendChild(executableGallery);

      // Adiciona a galeria de arquivos ZIP ao DOM
      const zipGallery = document.createElement('div');
      zipGallery.classList.add('zip-gallery');
      const zipTitle = document.createElement('h2');
      zipTitle.textContent = 'Arquivos ZIP';
      zipGallery.appendChild(zipTitle);
      groups.Zip.forEach(file => {
        const link = document.createElement('a');
        link.href = `${pasta}/${file}`;
        link.textContent = file;
        const listItem = document.createElement('li');
        listItem.appendChild(link);
        zipGallery.appendChild(listItem);
      });
      fileList.appendChild(zipGallery);

      // Adiciona a galeria de sistemas operacionais ao DOM
      const isoGallery = document.createElement('div');
      isoGallery.classList.add('iso-gallery');
      const sistemasOperacionaisTitle = document.createElement('h2');
      sistemasOperacionaisTitle.textContent = 'Sistemas Operacionais';
      isoGallery.appendChild(sistemasOperacionaisTitle);
      groups.SistemasOperacionais.forEach(file => {
        const link = document.createElement('a');
        link.href = `${pasta}/${file}`;
        link.textContent = file;
        const listItem = document.createElement('li');
        listItem.appendChild(link);
        isoGallery.appendChild(listItem);
      });
      fileList.appendChild(isoGallery);

      // Adiciona listener para a caixa de pesquisa
      searchBox.addEventListener('input', e => {
        const searchTerm = e.target.value.trim().toLowerCase();
        // Limpa resultados anteriores
        while (fileList.firstChild) {
          fileList.removeChild(fileList.firstChild);
        }
        files.forEach(file => {
          if (searchTerm && file.toLowerCase().includes(searchTerm)) {
            const extension = file.split('.').pop();
            if (['mp4', 'avi', 'wmv', 'mov'].includes(extension)) {
              // Adiciona miniatura do vídeo na lista
              const video = document.createElement('video');
              video.src = `${pasta}/${file}`;
              video.controls = true;
              video.style.maxHeight = '100px';
              const link = document.createElement('a');
              link.href = `${pasta}/${file}`;
              link.textContent = file;
              link.prepend(video);
              const regex = new RegExp(searchTerm, 'gi');
              link.innerHTML = link.textContent.replace(regex, `<mark>${searchTerm}</mark>`);
              const listItem = document.createElement('li');
              listItem.appendChild(link);
              fileList.appendChild(listItem);
            } else if (file.toLowerCase().includes(searchTerm)) {
              const link = document.createElement('a');
              link.href = `${pasta}/${file}`;
              const regex = new RegExp(searchTerm, 'gi');
              link.textContent = file.replace(regex, `<mark>${searchTerm}</mark>`);
              const listItem = document.createElement('li');
              listItem.appendChild(link);
              fileList.appendChild(listItem);
            }
          }
        });
      });
    } else {
      console.error('Erro ao carregar arquivos:', xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error('Erro ao carregar arquivos:', xhr.statusText);
  };
  xhr.send();
});



