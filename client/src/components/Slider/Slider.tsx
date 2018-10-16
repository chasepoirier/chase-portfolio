import * as React from 'react'
import { slideTransitionAnimation } from 'utils/animations'

// components
import Slide from './Slide'
import SliderControls from './SliderControls'
import SlideWrapper from './SlideWrapper'

// utils

import './slider.css'

interface IState {
  currentSlide: number
  sliderIsMoving: boolean
  percentTraveled: number
  canScroll: boolean
}

interface IProps {
  slides: any
  textures: any
}

class Slider extends React.Component<IProps, IState> {
  public state = {
    canScroll: true,
    currentSlide: 1,
    percentTraveled: 0,
    sliderIsMoving: false
  }

  public boundScroll = () => this.onscroll.bind(this)

  public componentDidMount() {
    window.addEventListener('wheel', this.boundScroll)
  }

  public componentWillUnmount() {
    window.removeEventListener('wheel', this.boundScroll)
  }

  public onscroll = (e: any) => {
    const scroll = e.deltaY

    if (scroll > 55 || scroll < -55) {
      if (scroll < 0 && this.state.canScroll) {
        this.countDown()
        this.setState({ canScroll: false })
        setTimeout(() => this.setState({ canScroll: true }), 900)
        slideTransitionAnimation()
      } else if (scroll > 0 && this.state.canScroll) {
        this.countUp()
        this.setState({ canScroll: false })
        setTimeout(() => this.setState({ canScroll: true }), 900)
        slideTransitionAnimation()
      }
    }
  }

  public countUp = () => {
    const current = this.state.currentSlide

    if (current === this.props.slides.length) {
      this.setState({
        currentSlide: 1,
        percentTraveled: 0
      })
    } else {
      this.setState({
        currentSlide: current + 1,
        percentTraveled: this.setPercentTraveled(current)
      })
    }
  }

  public countDown = () => {
    const current = this.state.currentSlide
    if (current === 1) {
      this.setState({
        currentSlide: this.props.slides.length,
        percentTraveled: 100
      })
    } else {
      this.setState({
        currentSlide: current - 1,
        percentTraveled: this.setPercentTraveled(current - 2)
      })
    }
  }

  public setCurrentSlide = (slide: any, expanding: any) => {
    this.setState({
      currentSlide: slide,
      percentTraveled: this.setPercentTraveled(slide - 1)
    })
    // wait 1 ms until for state to reset before transitioning
    if (!expanding) {
      setTimeout(() => slideTransitionAnimation(), 1)
    }
  }

  public setPercentTraveled = (slide: any) =>
    (slide / (this.props.slides.length - 1)) * 100

  public calculatePercentTraveled = (pos: any, totalLength: any) => {
    const percentTraveled = (pos / totalLength) * 100
    this.setState({ percentTraveled })
  }

  public toggleSliderIsMoving = (bool: boolean) => {
    this.setState({ sliderIsMoving: bool })
  }

  public renderSlides = () => {
    return this.props.slides.map((slide: any, index: number) => {
      return (
        <Slide
          key={slide.title}
          id={index + 1}
          current={this.state.currentSlide}
          slide={slide}
          texture={this.props.textures[index]}
        />
      )
    })
  }

  public render() {
    return (
      <div className="slider">
        <SlideWrapper
          sliderIsMoving={this.state.sliderIsMoving}
          currentSlide={this.state.currentSlide}
          toggleSliderIsMoving={this.toggleSliderIsMoving}
          percentTraveled={this.state.percentTraveled}
          totalSlides={this.props.slides.length}
          setCurrentSlide={this.setCurrentSlide}
        >
          {this.renderSlides()}
        </SlideWrapper>

        <SliderControls
          setCurrentSlide={this.setCurrentSlide}
          currentSlide={this.state.currentSlide}
          toggleSliderIsMoving={this.toggleSliderIsMoving}
          sliderIsMoving={this.state.sliderIsMoving}
          totalSlides={this.props.slides.length}
          calculatePercentTraveled={this.calculatePercentTraveled}
        />
      </div>
    )
  }
}

export default Slider
