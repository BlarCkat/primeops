"use client"

import Image from "next/image"
import Link from "next/link"
import type React from "react"

import { useState } from "react"
import { PiPlus } from "react-icons/pi"

export default function Home() {
  const [selectedCards, setSelectedCards] = useState<Array<CardType | null>>([null, null, null])

  const handleCardSelect = (card: CardType) => {
    const firstEmptyIndex = selectedCards.findIndex((item) => item === null)
    if (firstEmptyIndex !== -1) {
      const newSelectedCards = [...selectedCards]
      newSelectedCards[firstEmptyIndex] = card
      setSelectedCards(newSelectedCards)
    }
  }

  const handleRemoveCard = (index: number) => {
    const newSelectedCards = [...selectedCards]
    newSelectedCards[index] = null
    setSelectedCards(newSelectedCards)
  }

  return (
    <main className="max-w-md mx-auto bg-gray-50 min-h-screen pb-8">
      <header className="p-4 text-center">
        <h1 className="text-2xl font-bold text-green-500">guli</h1>
      </header>

      <div className="px-6">
        <h2 className="text-xl font-bold text-center">Take Charge of Your Finances</h2>
        <p className="text-center text-gray-600 text-sm mt-1 mb-4">
          Your money, your rules, let&apos;s make every decision count!
        </p>

        {/* Empty boxes at the top */}
        <div className="flex justify-between gap-2 mb-8">
          {selectedCards.map((card, index) => (
            <div
              key={index}
              className="w-full aspect-square border rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer"
              onClick={() => card && handleRemoveCard(index)}
            >
              {card ? (
                <div className="flex flex-col items-center p-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.bgColor}`}>
                    <Image src={card.image} alt={card.image} width={40} height={40}/>
                  </div>
                  <p className="text-xs mt-1 text-center">{card.title}</p>
                </div>
              ) : (
                <>
                  <PiPlus className="text-gray-300 mb-1" />
                  <span className="text-xs text-gray-400">
                    {index === 0 ? "Home" : index === 1 ? "Learn" : "Relax"}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Missions section */}
        <h3 className="text-gray-500 mb-3">Missions</h3>
        <div className="grid grid-cols-2 h-[500px] gap-4 mb-6">
          <Card
            title="Budgeting 101"
            image={'/img/module-1.svg'}
            bgColor="bg-pink-500"
            textColor="text-white"
            onSelect={handleCardSelect}
          />
          <Card
            title="Saving small amounts"
            image={'/img/module-2.svg'}
            bgColor="bg-yellow-300"
            textColor="text-black"
            onSelect={handleCardSelect}
          />
          <Card
            title="Identifying financial scams"
            image={'/img/module-3.svg'}
            bgColor="bg-green-500"
            textColor="text-white"
            onSelect={handleCardSelect}
          />
        </div>

        {/* Bite-sized Lessons section */}
        <h3 className="text-gray-500 mb-3">Bite-sized Lessons</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card
            title="How to create a basic budget"
            image={'/img/module-3.svg'}
            bgColor="bg-green-500"
            textColor="text-white"
            onSelect={handleCardSelect}
          />
          <Card
            title="Why emergency funds matter"
            image={'/img/module-2.svg'}
            bgColor="bg-purple-500"
            textColor="text-white"
            onSelect={handleCardSelect}
          />
        </div>

        {/* Continue button */}
        <Link href={'/home'} className="w-full py-3 bg-green-200 text-green-800 font-medium rounded-md">Continue</Link>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-4">© 2024 Prime-Ops. All rights reserved.</div>
      </div>
    </main>
  )
}

type CardType = {
  title: string
  image: string
  bgColor: string
  textColor: string
}

type CardProps = CardType & {
  onSelect: (card: CardType) => void
}

function Card({ title, image, bgColor, textColor, onSelect }: CardProps) {
  const handleClick = () => {
    onSelect({ title, image, bgColor, textColor })
  }

  return (
    <div className="rounded-lg overflow-hidden cursor-pointer" onClick={handleClick}>
      <div className={`${bgColor} p-4 flex flex-col items-center h-full`}>
        <Image className="" src={image} alt={title} height={100} width={100}/>
        <p className={`text-sm font-medium ${textColor} text-center`}>{title}</p>
      </div>
    </div>
  )
}

