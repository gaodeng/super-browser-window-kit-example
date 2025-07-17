const sideBarList = document.getElementsByClassName('side-bar-list')[0];
const sideBarListItems = sideBarList.getElementsByTagName('li');
const helloMsg = document.getElementById('hello-msg');
console.log(sideBarListItems);
for (let i = 0; i < sideBarListItems.length; i++) {
  sideBarListItems[i].addEventListener('click', function() {
    const active = document.getElementsByClassName('active')[0];
    if (active) {
      active.classList.remove('active');
    }
    this.classList.add('active');
    if(i === 0) {
      helloMsg.textContent = 'Hello Electron';
    } else if (i === 1) {
      helloMsg.textContent = 'Bonjour macOS';
    } else if (i === 2) {
        // japanese
      helloMsg.textContent = 'こんにちは Electron';
    } else {
        // korean
        helloMsg.textContent = '안녕하세요 Electron';
    }
  });
}