import './index.css';

window.onload = function () {
  const ws = new WebSocket('ws://localhost:3001');

  console.log(99);
  
  ws.onopen = function(event) {
    console.log("WebSocket is open now.", event, ws);
    ws.send('iconList');
  };

  ws.onerror = function () {
    console.log('错误');
  }
  
  // Listen for messages
  ws.addEventListener('message', function (event) {
    console.log('Message from server ', event);
    try {
      const iconList = JSON.parse(event.data);
      fetchAssets();
      renderIconList(iconList);
    } catch (e) {
      console.log(e);
    }
  });  

}

function renderIconList (iconList) {
  const container = document.createDocumentFragment();
  container.appendChild(createIconListContainer(iconList));

  document.getElementById('root').innerHTML = null;
  document.getElementById('root').appendChild(container);
}

function formatName(pathName) {
  const splitName = pathName.split('.');

  // remove suffix
  splitName.pop();
  const name = splitName.join('').split('/').join('-');

  return name;
}

function createIconListContainer(iconList) {
  console.log(iconList);
  const container = document.createDocumentFragment();

  // title
  const h1Node = document.createElement('h1');
  h1Node.appendChild(document.createTextNode('Icon 图标列表'));

  // list
  const ulNode = document.createElement('ul');
  ulNode.setAttribute('class', 'icon-list-ul');
  for(let i = 0; i < iconList.length;i++) {
    const liNode = document.createElement('li');
    const actualName = formatName(iconList[i].oppositePath);
    
    const iNode = document.createElement('i');
    iNode.setAttribute('class', `iconfont-${actualName}`)

    const pNode = document.createElement('p');

    const liText = document.createTextNode(actualName);
    pNode.appendChild(liText);
    liNode.appendChild(iNode);
    liNode.appendChild(pNode);
    ulNode.appendChild(liNode)
  }
  
  container.appendChild(h1Node);
  container.appendChild(ulNode);

  return container
}

function fetchAssets () {
  const link2 = document.getElementsByTagName('link')[0];
  link2.href = '/project/css/iconfont-web.css';
}
