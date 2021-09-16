import React from 'react'
import headerImg from '../assets/images/header_img.jpg'

import styles from '../css/Hero.module.css';

const Hero = ({ title, image }) => {
  return (
    <div className={styles.heroWrapper}>
      <img src={headerImg} alt="cover" />
      <h1>{ title }</h1>
    </div>
  )
}

export default Hero
