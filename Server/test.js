
const RunIt = (timeBlocks) => {
    const leftover = timeBlocks.filter(timeblock => timeblock.id === 4)
    console.log(leftover)
    timeBlocks.filter(timeblock => timeblock.id === 4)
    console.log(timeBlocks)
} 

RunIt([{id: 1}, {id: 2}, {id: 3}, {id: 4}])