import React from 'react';

import './styles.less';
import { Channel } from '../../../../models';
import moment from 'moment';

interface ChannelProps {
    channel: Channel;
}

const ChannelTile = ({ channel }: ChannelProps) => {
    const renderShows = () => {
        const currentTime = moment();
        const showsToList = channel.shows.filter((show) => {
            return moment(show.time, 'HH:mm').isSameOrAfter(currentTime, 'hour');
        });

        if (!showsToList.length) {
            return null;
        }

        return showsToList.map((show, index) => {
            if (index > 2) {
                return null;
            }

            return (
                <div key={show.time} className="mdb-tv-tab__channel-show">
                    <div className="mdb-tv-tab__channel-show-time">{show.time}</div>
                    <div className="mdb-tv-tab__channel-show-name">{show.name}</div>
                </div>
            );
        });
    };

    return (
        <div className="mdb-tv-tab__channel">
            <div className="mdb-tv-tab__channel-logo">
                <svg width="50" height="64" viewBox="0 0 50 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.73689 15.9179L0.439453 24.1231L29.3215 14.2769L16.5215 60.7179L34.2446 55.7949L49.6702 0L2.73689 15.9179ZM16.3574 21.3333L4.70612 64L13.5677 61.5385L25.5471 18.2154L16.3574 21.3333Z"
                        fill="#0757A8"
                    />
                </svg>
            </div>
            <div className="mdb-tv-tab__channel-info">
                <div className="mdb-tv-tab__channel-name">{channel.name}</div>
                <div className="mdb-tv-tab__channel-shows">{renderShows()}</div>
            </div>
        </div>
    );
};

export default ChannelTile;
