import React from 'react'
import styles from '../css/Hero.module.css';
import headerImg from '../assets/images/header_img.jpg'

const Hero = ({ title, image }) => {
  return (
    <div className={styles.heroWrapper}>
      <img src={headerImg} alt="cover" />
      <h1>{ title }</h1>
    </div>
  )
}

export default Hero
