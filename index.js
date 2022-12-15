document.addEventListener('DOMContentLoaded', () => {

    document.body.addEventListener('dragstart', handleDragStart)
    document.body.addEventListener('drop', handleDrop)
    document.body.addEventListener('dragover', handleOver)


    // document.body.addEventListener('mousedown', handleCursorGrab)
    // document.body.addEventListener('dragenter', handleEnter);
    // document.body.addEventListener('dragleave', handleLeave)

});



 function handleDragStart(e) {
        e.dataTransfer.setData('droppedItemInfo', JSON.stringify(e.target.dataset))
        e.dataTransfer.setData('droppedItemId', e.target.id)
        e.dataTransfer.setData('innerHTML', e.target.innerHTML);
}

function handleDrop(e) {
    let dropzone = e.target;
    if(!dropzone.classList.contains('cardslot') || (dropzone.children.length > 0) || dropzone.id === e.dataTransfer.getData('droppedItemId')) return;
    e.preventDefault()

    let droppedItemInfo = e.dataTransfer.getData('droppedItemInfo')
    let droppedItemId = e.dataTransfer.getData('droppedItemId')
    let droppedInnerHTML = e.dataTransfer.getData('innerHTML')

    document.getElementById(droppedItemId).remove()
    let newCard = document.createElement('div')
    let newCardData = JSON.parse(droppedItemInfo)
    newCard.id = newCardData.id;
    newCard.classList.add('card','cardslot')
    newCard.draggable = true;
    newCard.innerHTML = droppedInnerHTML;
    for (let property in newCardData) {
        newCard.dataset[property] = newCardData[property]
    }
    newCard.style.backgroundImage = `url(./assets/card-fronts/${newCard.id}.svg)`

    // document.getElementById(droppedItemId).remove()
    dropzone.appendChild(newCard)
    dropzone.classList.remove('over')
    }

function handleOver(e) {
    let dropzone = e.target;
    if(!dropzone.classList.contains('cardslot')) return;
    e.preventDefault();
    dropzone.classList.add('over');
    }
