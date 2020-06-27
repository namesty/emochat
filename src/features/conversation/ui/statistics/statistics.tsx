import React, { useEffect, useState } from 'react'
import { SheetLayout } from '../../../../application/ui/sheetLayout/sheetLayout'
import { ConversationRepositoryFactory } from '../../infrastructure/conversation-repository-factory'
import { BarChart, XAxis, YAxis, Bar, CartesianGrid } from  'recharts'
import { Emotion } from '../../../emotion/domain/emotion'
import styles from './statistics.module.css'
import { Header } from '../../../../application/ui/header/header'
import { CustomLoader } from '../../../../core/components/loader/loader'

export const Statistics: React.FC = () => {

  const [myEmotionsData, setMyEmotionsData] = useState<{ name: string, value: number }[]>([])
  const [othersEmotions, setOthersEmotionsData] = useState<Emotion[]>([])
  const [loading, setLoading] = useState(false)

  const conversationRepository = ConversationRepositoryFactory.build()

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    setLoading(true)
    const othersEmotions = await conversationRepository.getAvgEmotionsProvokedByMeInOthers()
    const myEmotions = await conversationRepository.getAvgEmotionsProvokedInMe()
    setLoading(false)

    if(myEmotions) {
      setMyEmotionsData(emotionToDataArray(myEmotions))
    }

    if(othersEmotions) {
      setOthersEmotionsData(othersEmotions)
    }

  }

  const emotionToDataArray = (emotion: Emotion) => [
    { name: 'Happiness', value: Math.round(emotion.Happy *100) },
    { name: 'Excitement', value: Math.round(emotion.Excited *100) },
    { name: 'Boredom', value: Math.round(emotion.Bored *100) },
    { name: 'Sadness', value: Math.round(emotion.Sad *100) },
    { name: 'Fear', value: Math.round(emotion.Fear *100) },
    { name: 'Anger', value: Math.round(emotion.Angry *100) }
  ]

  return (
    <SheetLayout>
      <div className={styles.mainContainer}>
        <Header
          text={'Statistics'}
          showBackButton={true}
        />
        {
          loading? <CustomLoader text={'Fetching statistics data...'} /> :
          <div className={styles.chartsContainer}>
            {
              myEmotionsData.length > 0 && 
              <div className={styles.myEmotions}>
                <h3 className={styles.subtitle}>Emotions I have felt the most</h3>
                <BarChart data={myEmotionsData} height={300} width={600}>
                  <XAxis dataKey="name"/>
                  <YAxis dataKey="value" type='number' domain={[0, 100]}/>
                  <Bar dataKey="value" fill="#4a4a4a" />
                </BarChart>
              </div>
            }
            {
              othersEmotions.length > 0 && 
              <div className={styles.myEmotions}>
                <h3 className={styles.subtitle}>Emotions I have caused in others</h3>
                {
                  othersEmotions.map(o => {
                    return <div className={styles.myEmotions}>
                      <h4>{o.user.name} {o.user.lastName} ({o.user.email})</h4>
                      <BarChart data={emotionToDataArray(o)} height={300} width={600}>
                        <XAxis dataKey="name"/>
                        <YAxis dataKey="value" type='number' domain={[0, 100]}/>
                        <Bar dataKey="value" fill="#4a4a4a" />
                      </BarChart>
                    </div>
                  })
                }
              </div>
            }
          </div>
        }

      </div>
    </SheetLayout>
  )

}