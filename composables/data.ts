export const data = ref([
    {path: 'photo01.jpg'},
    {path: 'photo02.jpg'},
    {path: 'photo03.jpg'},
    {path: 'photo04.jpg'},
    {path: 'photo05.jpg'},
    {path: 'photo06.jpg'},
    {path: 'photo07.jpg'},
    {path: 'photo08.jpg'},
    {path: 'photo09.jpg'},
    {path: 'photo10.jpg'},
    {path: 'photo11.jpg'},
].map((item, index) => {
    item.id = index + 1
    item.path = '/data/' + item.path
    item.grouped = index % 3 === 0
    item.parent = index % 3 === 0 && index !== 0 ? 0 : null
    item.locked = index % 4 === 0
    return item
}))
