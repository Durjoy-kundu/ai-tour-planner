"use client"
import React from "react"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

const AboutUs = () => {
  return (
    <section id="about-us" className="bg-gray-50 py-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Us</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to <span className="font-semibold">AI Travel Planner</span> —
          your smart companion for discovering the perfect travel experience.
          We combine AI-driven recommendations with real-time data to help you
          plan trips effortlessly. Whether it’s choosing the best hotels,
          exploring new destinations, or managing your budget, we make travel
          simple and enjoyable.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <Facebook size={28} />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-gray-600 hover:text-pink-500 transition"
          >
            <Instagram size={28} />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="text-gray-600 hover:text-sky-500 transition"
          >
            <Twitter size={28} />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-gray-600 hover:text-blue-700 transition"
          >
            <Linkedin size={28} />
          </Link>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-gray-50  text-gray-600 py-6 text-center">
      <p>
        Made with <span className="text-red-500 font-semibold">♥</span> by{" "}
        <span className="text-gray-800">Durjoy</span>
      </p>
    </footer>
  )
}

export { AboutUs, Footer }
