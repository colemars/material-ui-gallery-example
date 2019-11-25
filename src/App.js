import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  modal: {
  },
  img: {
    margin: 'auto',
    height: 'auto',
    maxWidth: '100%',
  },
  imgRoot: {
    outline: 0,
  },
  galleryItemRoot: {
    outline: 0,
    margin: 'auto',
    padding: '40px',
    textAlign: 'center'
  },
  icon: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  closeIcon: {
    position: 'fixed',
    top: '25px',
    right: '25px',
    userSelect: 'none',
    cursor: 'pointer'
  },
  galleryItemTitle: {
    margin: 'auto'
  }
}));

const galleryItems = [
  { src: 'https://picsum.photos/id/237/200/300', index: 0, title: 'puppy1' },
  { src: 'https://picsum.photos/id/237/300/300', index: 1, title: 'puppy2' },
  { src: 'https://picsum.photos/id/237/400/300', index: 2, title: 'pupp3' },
];

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = e => {
    setOpen(true);
  };

  const handleClose = e => {
    if (
      e.target.classList.value.includes("galleryItemRoot")
      || e.target.classList.value.includes("MuiBackdrop")
      || e.target.classList.value.includes("imgRoot")
    )
      setOpen(false)
  };

  const handleCloseIconClick = e => {
    setOpen(false);
  }

  const NextArrow = props => {
    const { className, style, onClick } = props;
    return (
      <ArrowForwardIcon style={{ ...style, fill: 'black', }} className={className} onClick={onClick} />
    )
  }

  const PrevArrow = props => {
    const { className, style, onClick } = props;
    return (
      <ArrowBackIcon style={{ ...style, fill: 'black' }} className={className} onClick={onClick} />
    )
  }



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.galleryItemRoot} onClick={handleClose}>
            <Slider {...settings}>
              {galleryItems.map(item => {
                return (
                  <div key={item.index} className={classes.imgRoot}>
                    <img className={classes.img} alt={''} src={item.src} />
                    <span className={classes.galleryItemTitle}>{item.title}</span>
                  </div>
                )
              })}
            </Slider>
            <CloseIcon className={classes.closeIcon} onClick={handleCloseIconClick} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
