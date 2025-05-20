"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import type { Device } from "@/lib/data"

interface DeviceListProps {
  devices: Device[]
}

export default function DeviceList({ devices }: DeviceListProps) {
  return (
    <div className="space-y-24 mb-16">
      {devices.map((device, index) => (
        <DeviceItem key={device.id} device={device} index={index} />
      ))}
    </div>
  )
}

function DeviceItem({ device, index }: { device: Device; index: number }) {
  const isEven = index % 2 === 0
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const imageVariants = {
    hidden: { opacity: 0, x: isEven ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const specVariants = {
    hidden: { opacity: 0, x: isEven ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  }

  return (
    <div ref={ref} className="relative">
      <div className="absolute -left-4 -top-4 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg z-10">
        {index + 1}
      </div>
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
        <motion.div className="w-full md:w-1/2" initial="hidden" animate={controls} variants={imageVariants}>
          <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
            <Image src={device.image || "/placeholder.svg"} alt={device.name} fill className="object-cover" />
          </div>
        </motion.div>

        <motion.div className="w-full md:w-1/2 space-y-4" initial="hidden" animate={controls} variants={specVariants}>
          <h2 className="text-2xl font-bold">{device.name}</h2>
          <p className="text-muted-foreground">{device.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {Object.entries(device.specs).map(([key, value]) => (
              <div key={key} className="bg-muted p-3 rounded-lg">
                <div className="text-sm font-medium text-muted-foreground">{key}</div>
                <div className="font-medium">{value}</div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${device.price}</div>
              <div className="flex items-center">
                <div className="text-yellow-500 mr-1">★</div>
                <div>{device.rating}/5</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
