/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { FunctionComponent as FC } from 'react';
import Helmet from 'react-helmet';
import { flow, flowRight } from 'lodash';
import { useMenuOptionUI } from '@bodiless/core';
import type { FormBodyProps } from '@bodiless/core';
import {
  withMeta,
  asBodilessHelmet,
  withMetaForm,
  withMetaStatic,
  ImageDropZone,
  TImagePickerUI,
} from '@bodiless/components';
import { SocialShare as SocialShareClean } from '@bodiless/organisms';
import type { SocialShareProvider } from '@bodiless/organisms';
import asSimpleSocialShare, {
  asOrangeSocialShare,
  DropZoneWrapper,
  StyledIcon,
  StyledLabel,
  LogoWrapper,
  Logo,
  WhiteIcon,
  LogoNoBackground,
  DropZoneDesign,
} from './token';
import imgFacebook from './images/facebook.png';
import imgFacebookRnd from './images/facebookimg.png';
import imgTwitter from './images/twitter.png';
import imgTwitterRnd from './images/twitterimg.png';
import imgEmail from './images/email.png';
import imgEmailRnd from './images/emailimg.png';

type ProviderProps = {
  name: string;
  icon: JSX.Element;
  onclick: Function;
};

const Icon = (icon: string): JSX.Element => (
  <StyledLabel>
    <WhiteIcon>{icon}</WhiteIcon>
  </StyledLabel>
);
const IconWithLabel = (icon: string, label?: string): JSX.Element => (
  <StyledLabel>
    <StyledIcon>{icon}</StyledIcon>
    {label}
  </StyledLabel>
);

/**
 * Popup window props type.
 *
 * Ref:
 *   https://developer.mozilla.org/en-US/docs/Web/API/Window/open
 */
type WindowOpenerProps = {
  name: string;
  url: string;
  toolbar?: boolean;
  scrollbars?: boolean;
  resizable?: boolean;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
};

/**
 * @todo: move to package component
 */
const Provider: FC<any> = (props: ProviderProps) => {
  const { name, icon, onclick } = props;
  return (
    <LogoWrapper data-label={name} data-icon={icon} onClick={onclick}>
      <Logo src={icon} alt={name} />
    </LogoWrapper>
  );
};
const ProviderCustomized: FC<any> = (props: ProviderProps) => {
  const { name, icon, onclick } = props;
  return (
    <LogoWrapper data-label={name} data-icon={icon} onClick={onclick}>
      <LogoNoBackground src={icon} alt={name} />
    </LogoWrapper>
  );
};

/**
 * Popup window opener
 */
const popupOpen = (props: WindowOpenerProps) => {
  const {
    url, name, toolbar, resizable, top, left, width, height,
  } = props;
  const features = `toolbar=${toolbar ? 'yes' : 'no'},\
    resizable=${resizable ? 'yes' : 'no'},\
    top=${top || '500'},\
    left=${left || '500'},\
    width=${width || '400'},\
    height=${height || '400'}`;
  window.open(url, name, features);
};

let sharedUrl = '';
let sharedTitle = '';
let sharedDescription = '';
if (typeof document !== 'undefined') {
  const linkElem = document.querySelector("link[rel='canonical']");
  const linkUrl = linkElem ? encodeURIComponent(linkElem.getAttribute('href') || '') : '';
  const ogUrlMeta = document.querySelector('meta[property="og:url"]');
  const ogUrl = ogUrlMeta ? encodeURIComponent(ogUrlMeta.content) : '';
  if (linkUrl) {
    sharedUrl = linkUrl;
  } else if (ogUrl) {
    sharedUrl = ogUrl;
  } else if (typeof window !== 'undefined') {
    sharedUrl = encodeURIComponent(window.location.href);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  sharedTitle = ogTitle ? ogTitle.content : '';
  const ogDescription = document.querySelector('meta[property="og:description"]');
  sharedDescription = ogDescription ? ogDescription.content : '';
}

/**
 * FaceBook social share provider.
 */
const facebookSrc = `https://www.facebook.com/sharer/sharer.php?u=${sharedUrl}&amp;src=sdkpreparse`;
const facebookShare = () => popupOpen({
  url: facebookSrc,
  name: 'share',
});
const facebook: SocialShareProvider = {
  id: 'facebook',
  element: <Provider
    name="FaceBook"
    icon={imgFacebook}
    onclick={facebookShare}
  />,
};
const facebookRound: SocialShareProvider = {
  id: 'facebook',
  element: <ProviderCustomized
    name="FaceBook"
    icon={imgFacebookRnd}
    onclick={facebookShare}
  />,
};

/**
 * Twitter social share provider.
 */
const twitterSrc = `https://twitter.com/intent/tweet?url=${sharedUrl}`;
const twitterShare = () => popupOpen({
  url: twitterSrc,
  name: 'share',
});
const twitter: SocialShareProvider = {
  id: 'twitter',
  element: <Provider
    name="Twitter"
    icon={imgTwitter}
    onclick={twitterShare}
  />,
};
const twitterRound: SocialShareProvider = {
  id: 'twitter',
  element: <ProviderCustomized
    name="Twitter"
    icon={imgTwitterRnd}
    onclick={twitterShare}
  />,
};

/**
 * Email share provider.
 */
const emailSrc = `mailto:?subject=${encodeURIComponent(sharedTitle)}&body=${encodeURIComponent(sharedDescription)}`;
const emailShare = () => { window.location.href = emailSrc; };
const email: SocialShareProvider = {
  id: 'email',
  element: <Provider
    name="Email"
    icon={imgEmail}
    onclick={emailShare}
  />,
};
const emailRound: SocialShareProvider = {
  id: 'email',
  element: <ProviderCustomized
    name="Email"
    icon={imgEmailRnd}
    onclick={emailShare}
  />,
};

const providers: SocialShareProvider[] = [
  facebook,
  twitter,
  email,
];
const providersCustomized: SocialShareProvider[] = [
  facebookRound,
  twitterRound,
  emailRound,
];

const SimpleSocialShare = flow(asSimpleSocialShare)(SocialShareClean);
const CustomizedSocialShare = flow(asOrangeSocialShare)(SocialShareClean);
const IconOnlySocialShare = () => (
  <CustomizedSocialShare providers={providersCustomized} buttonContent={Icon('share')} />
);
export default () => (
  <SimpleSocialShare providers={providers} buttonContent={IconWithLabel('share', 'Share')} />
);
export { IconOnlySocialShare };

/**
 * Social Share menu.
 */
const socialShareFormHeader = {
  title: 'Social Share Management',
  description: 'Enter the page level Open Graph data used for Social Share.',
};
const useMenuOptions = () => [
  {
    name: 'share',
    icon: 'share',
    label: 'Share',
  },
];
const withSocialShareTitle = withMeta({
  name: 'og:title',
  label: 'Title',
  attribute: 'property',
});
const metaSocialShareImageName = 'og:image';

const DropZoneUploadArea = DropZoneDesign.UploadArea;
const dropZoneUI: Partial<TImagePickerUI> = {
  UploadArea: () => <DropZoneUploadArea>Drag a file or click here to upload.</DropZoneUploadArea>,
};

const SocialShareFormImage = (props: FormBodyProps) => {
  const { ComponentFormText } = useMenuOptionUI();
  const { formapi } = props;
  return (
    <DropZoneWrapper>
      <ComponentFormText field={metaSocialShareImageName} id="social-share-img-src" />
      <ImageDropZone formApi={formapi} targetFieldName={metaSocialShareImageName} ui={dropZoneUI} />
    </DropZoneWrapper>
  );
};

const withSocialShareImage = withMeta({
  name: 'og:image',
  label: 'Image',
  useFormElement: () => SocialShareFormImage,
  attribute: 'property',
});

const withSocialShareDescription = withMeta({
  name: 'og:description',
  useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
  label: 'Description',
  attribute: 'property',
});
const withSocialShareUrl = withMeta({
  name: 'og:url',
  label: 'Url',
  attribute: 'property',
});
const withSocialShareType = withMetaStatic({
  name: 'og:type',
  attribute: 'property',
});
const withSocialShareSitename = withMetaStatic({
  name: 'og:sitename',
  attribute: 'property',
});
const withSocialShareTwitterCard = withMetaStatic({
  name: 'twitter:card',
});
const withSocialShareTwitterSite = withMetaStatic({
  name: 'twitter:site',
});

const SocialShareHelmet = flowRight(
  withMetaForm(useMenuOptions, socialShareFormHeader),
  asBodilessHelmet('meta'),
  withSocialShareTitle('og-title', ''),
  withSocialShareImage('og-image', ''),
  withSocialShareUrl('og-url', ''),
  withSocialShareDescription('og-description', ''),
  withSocialShareType({ nodeKey: 'og:type', nodeCollection: 'site' }),
  withSocialShareSitename({ nodeKey: 'og:sitename', nodeCollection: 'site' }),
  withSocialShareTwitterCard({ nodeKey: 'twitter:card', nodeCollection: 'site' }),
  withSocialShareTwitterSite({ nodeKey: 'twitter:site', nodeCollection: 'site' }),
)(Helmet);

export { SocialShareHelmet };
