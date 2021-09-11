export const timeDifference = (creationTime) => {

    const now = new Date()
    const timeCreated = new Date(creationTime)

    const year = now.getFullYear() - timeCreated.getFullYear()
    const day = now.getDate() - timeCreated.getDate()
    const hours = now.getHours() - timeCreated.getHours()
    const minutes = now.getMinutes() - timeCreated.getMinutes() 
    const seconds = now.getSeconds() - timeCreated.getSeconds()


    if (year != 0){
        return year+"h"
    }

    if(day != 0){
        return day+"d"
    }

    if (hours != 0){
        
        return hours+"h"
    }

    if(minutes != 0){
        return minutes+"m"
    }

    if(seconds != 0){
        return seconds+"s"
    }

}