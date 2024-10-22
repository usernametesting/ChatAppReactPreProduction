import React, { useEffect, useState } from 'react';
import './Stickers.css';

const Stickers: React.FC<{ onClose: () => void; onStickerSelect: (url: string) => void }> = ({ onClose, onStickerSelect }) => {
    const [searchTerm, setSearchTerm] = useState('smile');
    const [show, setShow] = useState(false);
    const [stickers, setStickers] = useState<string[]>([]);

    useEffect(() => {
        const search = async () => {
            if (searchTerm.length > 2)
                await searchStickers();
        };
        search();
    }, [searchTerm])

    const searchStickers = async () => {
        const response = await fetch(`https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${import.meta.env.VITE_GOOGLE_CLOUD_API_KEY}&limit=30`);
        const data = await response.json();
        const stickerUrls = data.results.map((item: any) => item.media_formats.gif.url);
        setStickers(stickerUrls);
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" style={{ color: 'black', display: 'flex', alignItems: 'end', justifyContent: 'end' ,width:'100%'}} onClick={onClose}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
                <h3>Search Stickers</h3>
                <input
                    type="text"
                    className="sticker-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type to search stickers..."
                    onFocus={(e) => {
                        e.stopPropagation();
                        e.target.focus();
                    }}
                />
                <div className="sticker-grid">
                    {stickers.map((stickerUrl, index) => (
                        <img
                            key={index}
                            src={stickerUrl}
                            alt="sticker"
                            className="sticker-item"
                            onClick={() => onStickerSelect(stickerUrl)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stickers;
