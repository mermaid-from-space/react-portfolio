import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
       // data that we will need:
        // backgroud image:thumb_img_url
        //  logo
        // description:description
        // id:id  for slug

        const { id, thumb_image_url, logo} = props.item;
    return (
        <div>
        <img src={thumb_image_url} />
        <img src={logo} />
            <div>Description</div>
          <Link to={`/portfolio/${id}`}>Link</Link>
        </div>
    );
}

