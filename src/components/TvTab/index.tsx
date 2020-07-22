import React, { useEffect, useState } from 'react';

import { Channel } from '../../models';
import { getChannelsMock } from '../../helpers';
import ChannelTile from './components/ChannelTile';
import { Scrollbars } from 'react-custom-scrollbars';

import './styles.less';

const TvTab = () => {
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        const loadedChannels = getChannelsMock();
        setChannels(loadedChannels);
    }, []);

    const renderChannels = () => {
        if (!channels.length) {
            return null;
        }

        return channels.map((channel, index) => <ChannelTile key={index} channel={channel} />);
    };

    return (
        <Scrollbars className="mdb-tv-tab" style={{ height: '712px' }}>
            {renderChannels()}
        </Scrollbars>
    );
};

export default TvTab;
