import styles from './ImagePopup.module.css';
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import Image from 'next/image';

export default function ImagePopup({ popupOpen, setPopupOpen, arrayObject, index }) {
  return (
    <div id={styles.modal_container}>

      <Transition show={popupOpen} as={Fragment}>
        <Dialog open={popupOpen} onClose={() => setPopupOpen(false)} className={styles.dialog}>
          <Dialog.Overlay className={styles.dialog_overlay} />
          <div className={`${styles.popup_button_left} ${styles.popup_button}`}>
            <MdKeyboardArrowLeft />
          </div>
          <div className={`${styles.popup_button_right} ${styles.popup_button}`}>
            <MdKeyboardArrowRight />
          </div>
          <div id='image-modal' className={styles.modal} onClick={() => setPopupOpen(false)}>
            <div className={styles.image_loader}></div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              initialSlide={index}
              navigation={{
                nextEl: `.${styles.popup_button_right}`,
                prevEl: `.${styles.popup_button_left}`,
              }}
              className={styles.modal_swiper}
            >
              {arrayObject.pictures2.map((src, index) => (
                <SwiperSlide
                  className={`${styles.modal_slide} swiper-slide swiper-lazy`}
                  key={index}
                >
                  <Image fill className={`${styles.popup_gallery_image} swiper-lazy`} src={src} alt='project' />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}





