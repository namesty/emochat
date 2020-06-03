import { Emotion } from "./emotion";
import { User } from "../../user/domain/user";
import { Gradient } from "./gradient";

type Keys = 'Happy' | 'Angry' | 'Fear' | 'Bored' | 'Excited' | 'Sad'

export class EmotionService {

  private colorMap = {
    Happy: "#FFD333",
    Angry: "#FF2020",
    Fear: "#661B0B",
    Bored: "#9090A0",
    Excited: "#EF6F18",
    Sad: "#37649B"
  }

  getLatestEmotionFromUser = (emotions: Emotion[], userEmail: string) => {
    const userEmotions = emotions.filter(e => e.user.email === userEmail)

    return userEmotions.sort((a, b) => {
      return parseInt(b.date) - parseInt(a.date)
    })[0]
  }

  getGradient = (n: number, emotion: Emotion) => {

    //TODO: Extraer en metodos

    const emotionMap = {
      Happy: emotion.Happy,
      Angry: emotion.Angry,
      Fear: emotion.Fear,
      Bored: emotion.Bored,
      Excited: emotion.Excited,
      Sad: emotion.Sad
    }

    //Sort N emotion feelings by value
    const strongestFeelings = Object.entries(emotionMap).sort(([aKey, aVal], [bKey, bVal]) => {
      return bVal - aVal
    })
    .slice(0, n)
    .map(([key, value]) => ({
      feeling: key,
      value
    }))

    //Replace their values by ratios, according to N

    const sum = strongestFeelings.reduce((prev, current) => {
      return prev + current.value
    }, 0)

    const feelingRatios = strongestFeelings.map(x => ({
      value: (x.value * 100) / sum,
      feeling: x.feeling
    }))

    //Calculate gradient breakpoints
    
    const breakpoints: number[] = []

    feelingRatios.forEach((fr, i) => {
      const prevBreakpointsSum = breakpoints.reduce((prev, current) => {
        return prev + current
      }, 0)

      breakpoints.push(prevBreakpointsSum + fr.value)
    })

    console.log(breakpoints)

    //Build linear gradient string

    return feelingRatios.reduce((prev, current, i) => {

      if(feelingRatios[i+1]){
        return prev + `${this.colorMap[current.feeling as Keys]} ${breakpoints[i]}%, `
      }

      return prev + `${this.colorMap[current.feeling as Keys]} ${breakpoints[i]}%)`
    }, `linear-gradient(to right, `)
  }

  getLatestUserGradient = (emotions: Emotion[], userEmail: string): string => {
    const latestEmotion =  this.getLatestEmotionFromUser(emotions, userEmail)

    if(!latestEmotion) return ''

    return this.getGradient(3, latestEmotion)
  }

  getLatestUserGroupGradients = (emotions: Emotion[], conversationUsers: User[]): Gradient[] => {

    return conversationUsers
      .map(u => ({
        user: u,
        gradient: this.getLatestUserGradient(emotions, u.email)
      }))
  }

}