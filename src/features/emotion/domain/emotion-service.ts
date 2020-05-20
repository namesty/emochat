import { Emotion } from "./emotion";

type Keys = 'Happy' | 'Angry' | 'Fear' | 'Bored' | 'Excited' | 'Sad'

export class EmotionService {

  private colorMap = {
    Happy: "#F0C430",
    Angry: "#E54D40",
    Fear: "#995DB5",
    Bored: "#3ACA75",
    Excited: "#E37F31",
    Sad: "#3081B8"
  }

  getGradient = (n: number, emotion: Emotion) => {

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

    //Build linear gradient string

    return feelingRatios.reduce((prev, current, i) => {

      if(feelingRatios[i+1]){
        return prev + `${this.colorMap[current.feeling as Keys]} ${breakpoints[i]}%, `
      }

      return prev + `${this.colorMap[current.feeling as Keys]} ${breakpoints[i]}%)`
    }, `linear-gradient(to right, `)
  }
}