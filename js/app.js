import "../css/style.scss"

document.addEventListener("DOMContentLoaded", () => {
  let imagesContainerElActive

  let img1ElActive
  let img2ElActive

  let img2ContainerElActive
  let dividerElActive

  let imagesContainerWidth
  let imagesContainerLeftOffset
  let dragging = false

  const imagesContainersElAll = document.querySelectorAll(
    ".slider__images-container"
  )

  const imgs1ElAll = document.querySelectorAll(
    ".slider__image-container--first img"
  )
  const imgs2ElAll = document.querySelectorAll(
    ".slider__image-container--second img"
  )
  const img2ContainersElAll = document.querySelectorAll(
    ".slider__image-container--second"
  )
  const handlesElAll = document.querySelectorAll(".slider__handle")
  const dividersElAll = document.querySelectorAll(".slider__divider")

  function getOffset(clientX) {
    const offset = clientX - imagesContainerLeftOffset
    if (offset < 0) {
      return 0
    } else if (offset > imagesContainerWidth) {
      return imagesContainerWidth
    } else {
      return offset
    }
  }
  function move(clientX) {
    const offset = getOffset(clientX)
    const percent = (offset / imagesContainerWidth) * 100
    dividerElActive.style.left = `${percent}%`
    img2ContainerElActive.style.width = `${percent}%`
  }

  function setActiveContainers(i) {
    dragging = true
    imagesContainerElActive = imagesContainersElAll[i]
    img1ElActive = imgs1ElAll[i]
    img2ElActive = imgs2ElAll[i]
    dividerElActive = dividersElAll[i]
    img2ContainerElActive = img2ContainersElAll[i]
  }
  function initEvents() {
    handlesElAll.forEach((handle, i) => {
      handle.addEventListener("mousedown", () => {
        setActiveContainers(i)
      })

      handle.addEventListener("touchstart", () => {
        setActiveContainers(i)
      })
    })
    window.addEventListener("mouseup", () => {
      dragging = false
    })

    window.addEventListener("touchend", () => {
      dragging = false
    })

    window.addEventListener("mousemove", (e) => {
      if (dragging) {
        move(e.clientX)
      }
    })

    window.addEventListener("touchmove", (e) => {
      if (dragging) {
        move(e.touches[0].clientX)
      }
    })
  }

  function adjustImagesSize() {
    imagesContainerWidth = imagesContainersElAll[0].offsetWidth
    imagesContainerLeftOffset = imagesContainersElAll[0].offsetLeft

    for (let i = 0; i < imagesContainersElAll.length; i++) {
      imgs1ElAll[i].style.width = imagesContainerWidth + "px"
      imgs2ElAll[i].style.width = imagesContainerWidth + "px"
    }
  }

  window.addEventListener("resize", adjustImagesSize)
  adjustImagesSize()
  initEvents()
})
