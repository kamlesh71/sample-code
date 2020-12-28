import { useMutation, useReactiveVar } from '@apollo/client';
import { UPDATE_AVATAR_MUTATION } from 'graphql/mutations/account';
import { ActiveUser, EnableFullScreenLoader } from 'graphql/variables';
import { getValidationErrors, isValidationError } from 'helpers';
import React, { ChangeEvent, useRef } from 'react'
import { Image } from 'react-bootstrap'
import { toast } from 'react-toastify';

import styles from './Avatar.module.scss'

const AVATAR_TOAST = 'AVATAR_TOAST';

const Avatar: React.FC = () => {

    const user = useReactiveVar(ActiveUser);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [updateAvatar] = useMutation(UPDATE_AVATAR_MUTATION);

    const handleUpdateAvatar = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files[0]) {

            if (toast.isActive(AVATAR_TOAST)) {
                toast.dismiss(AVATAR_TOAST);
            }

            EnableFullScreenLoader(true);

            updateAvatar({
                variables: {
                    avatar: e.target.files[0]
                }
            }).then(({ data }) => {

                const user = data.updateAvatar;

                ActiveUser(user);

                toast.success('Your profile picture updated successfully.', {
                    toastId: AVATAR_TOAST
                });

            }).catch(error => {

                if (isValidationError(error)) {
                    const errors = getValidationErrors(error);

                    toast.error(errors[Object.keys(errors)[0]], {
                        toastId: AVATAR_TOAST
                    });
                }

                console.log('avatar upload error', error);
            }).finally(() => {
                EnableFullScreenLoader(false);
            })
        }
    }, []);

    const handleBrowseFile = React.useCallback(() => {
        fileInputRef.current.click();
    }, [fileInputRef]);

    if (!user) {
        return null;
    }

    return (
        <div className={styles.userHeading}>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpdateAvatar}
                style={{ display: 'none' }}
            />

            <div className={styles.imgWrapper}>

                <Image src={user.photoThumb} />

                <div className={styles.iconWrapper}>
                    <Image
                        onClick={handleBrowseFile}
                        src={require('../../assets/images/icons/camera.svg')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Avatar;