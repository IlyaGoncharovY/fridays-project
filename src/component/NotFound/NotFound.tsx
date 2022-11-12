import React from 'react';
import s from "./NotFound.module.scss"
import notFound from "./../../common/assets/images/404.jpg"

export const NotFound = () => {
    return (
        <div className={s.notFound}>
            <img className={s.imgNotFound} src={notFound} alt=""/>
        </div>
    );
};

