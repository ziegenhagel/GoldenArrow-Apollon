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
    item.id = index
    item.path = '/data/' + item.path
    item.grouped = index % 3 === 0
    item.parent = index % 3 === 0 && index !== 0 ? 0 : null
    item.locked = index % 4 === 0
    item.moons = []
    Math.random() > 0.3 && item.moons.push('Vorhang')
    Math.random() > 0.3 && item.moons.push('Magische Linse')
    Math.random() > 0.3 && item.moons.push('Separater Slider')
    Math.random() > 0.3 && item.moons.push('Lupe')
    Math.random() > 0.3 && item.moons.push('Zoom & Pan')
    Math.random() > 0.3 && item.moons.push('Zoom & Mini-Map')
    Math.random() > 0.3 && item.moons.push('Weltkarte')
    Math.random() > 0.3 && item.moons.push('Zeitstrahl')
    Math.random() > 0.3 && item.moons.push('Netz')
    Math.random() > 0.5 && item.moons.push('Freie Selektion')
    Math.random() > 0.5 && item.moons.push('Points of Interest')
    return item
}))
