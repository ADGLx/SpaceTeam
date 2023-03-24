function validateJob(position, positionInfo){

    const positionLength = position.length >= 1
    const infoLength = positionInfo.length >= 1

    return(positionLength && infoLength)
}

module.exports = validateJob