import{r as c,_ as k,h as b,c as g,i as P,j as N}from"./index-85cf5052.js";const z=c.createContext(null);function O(e){const t=e.clone();return t.pixelsToGLUnits=e.pixelsToGLUnits,t}function A(e){return{longitude:e.center.lng,latitude:e.center.lat,zoom:e.zoom,pitch:e.pitch,bearing:e.bearing,padding:e.padding}}function C(e,t){const n=t.viewState||t;let r=!1;if("longitude"in n&&"latitude"in n){const o=e.center;e.center=new o.constructor(n.longitude,n.latitude),r=r||o!==e.center}if("zoom"in n){const o=e.zoom;e.zoom=n.zoom,r=r||o!==e.zoom}if("bearing"in n){const o=e.bearing;e.bearing=n.bearing,r=r||o!==e.bearing}if("pitch"in n){const o=e.pitch;e.pitch=n.pitch,r=r||o!==e.pitch}return n.padding&&!e.isPaddingEqual(n.padding)&&(r=!0,e.padding=n.padding),r}const U=["type","source","source-layer","minzoom","maxzoom","filter","layout"];function S(e){if(!e)return null;if(typeof e=="string"||("toJS"in e&&(e=e.toJS()),!e.layers))return e;const t={};for(const r of e.layers)t[r.id]=r;const n=e.layers.map(r=>{const o=t[r.ref];let i=null;if("interactive"in r&&(i={...r},delete i.interactive),o){i=i||{...r},delete i.ref;for(const s of U)s in o&&(i[s]=o[s])}return i||r});return{...e,layers:n}}function B(e,t){const n=Array.isArray(e)?e[0]:e?e.x:0,r=Array.isArray(e)?e[1]:e?e.y:0,o=Array.isArray(t)?t[0]:t?t.x:0,i=Array.isArray(t)?t[1]:t?t.y:0;return n===o&&r===i}function m(e,t){if(e===t)return!0;if(!e||!t)return!1;if(Array.isArray(e)){if(!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!m(e[n],t[n]))return!1;return!0}else if(Array.isArray(t))return!1;if(typeof e=="object"&&typeof t=="object"){const n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(const o of n)if(!t.hasOwnProperty(o)||!m(e[o],t[o]))return!1;return!0}return!1}const M={mousedown:"onMouseDown",mouseup:"onMouseUp",mouseover:"onMouseOver",mousemove:"onMouseMove",click:"onClick",dblclick:"onDblClick",mouseenter:"onMouseEnter",mouseleave:"onMouseLeave",mouseout:"onMouseOut",contextmenu:"onContextMenu",touchstart:"onTouchStart",touchend:"onTouchEnd",touchmove:"onTouchMove",touchcancel:"onTouchCancel"},_={movestart:"onMoveStart",move:"onMove",moveend:"onMoveEnd",dragstart:"onDragStart",drag:"onDrag",dragend:"onDragEnd",zoomstart:"onZoomStart",zoom:"onZoom",zoomend:"onZoomEnd",rotatestart:"onRotateStart",rotate:"onRotate",rotateend:"onRotateEnd",pitchstart:"onPitchStart",pitch:"onPitch",pitchend:"onPitchEnd"},w={wheel:"onWheel",boxzoomstart:"onBoxZoomStart",boxzoomend:"onBoxZoomEnd",boxzoomcancel:"onBoxZoomCancel",resize:"onResize",load:"onLoad",render:"onRender",idle:"onIdle",remove:"onRemove",data:"onData",styledata:"onStyleData",sourcedata:"onSourceData",error:"onError"},I=["minZoom","maxZoom","minPitch","maxPitch","maxBounds","projection","renderWorldCopies"],F=["scrollZoom","boxZoom","dragRotate","dragPan","keyboard","doubleClickZoom","touchZoomRotate","touchPitch"];class v{constructor(t,n,r){this._map=null,this._internalUpdate=!1,this._inRender=!1,this._hoveredFeatures=null,this._deferredEvents={move:!1,zoom:!1,pitch:!1,rotate:!1},this._onEvent=o=>{const i=this.props[w[o.type]];i&&i(o)},this._onPointerEvent=o=>{(o.type==="mousemove"||o.type==="mouseout")&&this._updateHover(o);const i=this.props[M[o.type]];if(i){if(this.props.interactiveLayerIds&&o.type!=="mouseover"&&o.type!=="mouseout"){const s=this._hoveredFeatures||this._map.queryRenderedFeatures(o.point,{layers:this.props.interactiveLayerIds});o.features=s}i(o),delete o.features}},this._onCameraEvent=o=>{if(!this._internalUpdate){const i=this.props[_[o.type]];i&&i(o)}o.type in this._deferredEvents&&(this._deferredEvents[o.type]=!1)},this._MapClass=t,this.props=n,this._initialize(r)}get map(){return this._map}get transform(){return this._renderTransform}setProps(t){const n=this.props;this.props=t;const r=this._updateSettings(t,n);r&&this._createShadowTransform(this._map);const o=this._updateSize(t),i=this._updateViewState(t,!0);this._updateStyle(t,n),this._updateStyleComponents(t,n),this._updateHandlers(t,n),(r||o||i&&!this._map.isMoving())&&this.redraw()}static reuse(t,n){const r=v.savedMaps.pop();if(!r)return null;const o=r.map,i=o.getContainer();for(n.className=i.className;i.childNodes.length>0;)n.appendChild(i.childNodes[0]);o._container=n,r.setProps({...t,styleDiffing:!1}),o.resize();const{initialViewState:s}=t;return s&&(s.bounds?o.fitBounds(s.bounds,{...s.fitBoundsOptions,duration:0}):r._updateViewState(s,!1)),o.isStyleLoaded()?o.fire("load"):o.once("styledata",()=>o.fire("load")),r}_initialize(t){const{props:n}=this,r={...n,...n.initialViewState,accessToken:n.mapboxAccessToken||H()||null,container:t,style:S(n.mapStyle)},o=r.initialViewState||r.viewState||r;if(Object.assign(r,{center:[o.longitude||0,o.latitude||0],zoom:o.zoom||0,pitch:o.pitch||0,bearing:o.bearing||0}),n.gl){const a=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=()=>(HTMLCanvasElement.prototype.getContext=a,n.gl)}const i=new this._MapClass(r);o.padding&&i.setPadding(o.padding),n.cursor&&(i.getCanvas().style.cursor=n.cursor),this._createShadowTransform(i);const s=i._render;i._render=a=>{this._inRender=!0,s.call(i,a),this._inRender=!1};const u=i._renderTaskQueue.run;i._renderTaskQueue.run=a=>{u.call(i._renderTaskQueue,a),this._onBeforeRepaint()},i.on("render",()=>this._onAfterRepaint());const l=i.fire;i.fire=this._fireEvent.bind(this,l),i.on("resize",()=>{this._renderTransform.resize(i.transform.width,i.transform.height)}),i.on("styledata",()=>this._updateStyleComponents(this.props,{})),i.on("sourcedata",()=>this._updateStyleComponents(this.props,{}));for(const a in M)i.on(a,this._onPointerEvent);for(const a in _)i.on(a,this._onCameraEvent);for(const a in w)i.on(a,this._onEvent);this._map=i}recycle(){const n=this.map.getContainer().querySelector("[mapboxgl-children]");n==null||n.remove(),v.savedMaps.push(this)}destroy(){this._map.remove()}redraw(){const t=this._map;!this._inRender&&t.style&&(t._frame&&(t._frame.cancel(),t._frame=null),t._render())}_createShadowTransform(t){const n=O(t.transform);t.painter.transform=n,this._renderTransform=n}_updateSize(t){const{viewState:n}=t;if(n){const r=this._map;if(n.width!==r.transform.width||n.height!==r.transform.height)return r.resize(),!0}return!1}_updateViewState(t,n){if(this._internalUpdate)return!1;const r=this._map,o=this._renderTransform,{zoom:i,pitch:s,bearing:u}=o,l=r.isMoving();l&&(o.cameraElevationReference="sea");const a=C(o,{...A(r.transform),...t});if(l&&(o.cameraElevationReference="ground"),a&&n){const d=this._deferredEvents;d.move=!0,d.zoom||(d.zoom=i!==o.zoom),d.rotate||(d.rotate=u!==o.bearing),d.pitch||(d.pitch=s!==o.pitch)}return l||C(r.transform,t),a}_updateSettings(t,n){const r=this._map;let o=!1;for(const i of I)i in t&&!m(t[i],n[i])&&(o=!0,r[`set${i[0].toUpperCase()}${i.slice(1)}`](t[i]));return o}_updateStyle(t,n){if(t.cursor!==n.cursor&&(this._map.getCanvas().style.cursor=t.cursor),t.mapStyle!==n.mapStyle){const r={diff:t.styleDiffing};return"localIdeographFontFamily"in t&&(r.localIdeographFontFamily=t.localIdeographFontFamily),this._map.setStyle(S(t.mapStyle),r),!0}return!1}_updateStyleComponents(t,n){const r=this._map;let o=!1;return r.style.loaded()&&("light"in t&&!m(t.light,n.light)&&(o=!0,r.setLight(t.light)),"fog"in t&&!m(t.fog,n.fog)&&(o=!0,r.setFog(t.fog)),"terrain"in t&&!m(t.terrain,n.terrain)&&(!t.terrain||r.getSource(t.terrain.source))&&(o=!0,r.setTerrain(t.terrain))),o}_updateHandlers(t,n){const r=this._map;let o=!1;for(const i of F){const s=t[i];m(s,n[i])||(o=!0,s?r[i].enable(s):r[i].disable())}return o}_updateHover(t){var n;const{props:r}=this;if(r.interactiveLayerIds&&(r.onMouseMove||r.onMouseEnter||r.onMouseLeave)){const i=t.type,s=((n=this._hoveredFeatures)===null||n===void 0?void 0:n.length)>0;let u;if(i==="mousemove")try{u=this._map.queryRenderedFeatures(t.point,{layers:r.interactiveLayerIds})}catch{u=[]}else u=[];const l=u.length>0;!l&&s&&(t.type="mouseleave",this._onPointerEvent(t)),this._hoveredFeatures=u,l&&!s&&(t.type="mouseenter",this._onPointerEvent(t)),t.type=i}else this._hoveredFeatures=null}_fireEvent(t,n,r){const o=this._map,i=o.transform,s=typeof n=="string"?n:n.type;return s==="move"&&this._updateViewState(this.props,!1),s in _&&(typeof n=="object"&&(n.viewState=A(i)),this._map.isMoving())?(o.transform=this._renderTransform,t.call(o,n,r),o.transform=i,o):(t.call(o,n,r),o)}_onBeforeRepaint(){const t=this._map;this._internalUpdate=!0;for(const r in this._deferredEvents)this._deferredEvents[r]&&t.fire(r);this._internalUpdate=!1;const n=this._map.transform;this._map.transform=this._renderTransform,this._onAfterRepaint=()=>{this._map.transform=n}}}v.savedMaps=[];function H(){let e=null;if(typeof location<"u"){const t=/access_token=([^&\/]*)/.exec(location.search);e=t&&t[1]}try{e=e||{}.MapboxAccessToken}catch{}try{e=e||{}.REACT_APP_MAPBOX_ACCESS_TOKEN}catch{}return e}const Q=["setMaxBounds","setMinZoom","setMaxZoom","setMinPitch","setMaxPitch","setRenderWorldCopies","setProjection","setStyle","addSource","removeSource","addLayer","removeLayer","setLayerZoomRange","setFilter","setPaintProperty","setLayoutProperty","setLight","setTerrain","setFog","remove"];function Z(e,t){if(!e)return null;const n=e.map,r={getMap:()=>n,getCenter:()=>e.transform.center,getZoom:()=>e.transform.zoom,getBearing:()=>e.transform.bearing,getPitch:()=>e.transform.pitch,getPadding:()=>e.transform.padding,getBounds:()=>e.transform.getBounds(),project:o=>e.transform.locationPoint(t.LngLat.convert(o)),unproject:o=>e.transform.pointLocation(t.Point.convert(o)),queryTerrainElevation:(o,i)=>{const s=n.transform;n.transform=e.transform;const u=n.queryTerrainElevation(o,i);return n.transform=s,u}};for(const o of D(n))!(o in r)&&!Q.includes(o)&&(r[o]=n[o].bind(n));return r}function D(e){const t=new Set;let n=e;for(;n;){for(const r of Object.getOwnPropertyNames(n))r[0]!=="_"&&typeof e[r]=="function"&&r!=="fire"&&r!=="setEventedParent"&&t.add(r);n=Object.getPrototypeOf(n)}return Array.from(t)}const j=typeof document<"u"?c.useLayoutEffect:c.useEffect,V=["baseApiUrl","maxParallelImageRequests","workerClass","workerCount","workerUrl"];function Y(e,t){for(const n of V)n in t&&(e[n]=t[n]);t.RTLTextPlugin&&e.getRTLTextPluginStatus&&e.getRTLTextPluginStatus()==="unavailable"&&e.setRTLTextPlugin(t.RTLTextPlugin,n=>{n&&console.error(n)},!1)}const y=c.createContext(null),W={minZoom:0,maxZoom:22,minPitch:0,maxPitch:60,scrollZoom:!0,boxZoom:!0,dragRotate:!0,dragPan:!0,keyboard:!0,doubleClickZoom:!0,touchZoomRotate:!0,touchPitch:!0,mapStyle:{version:8,sources:{},layers:[]},styleDiffing:!0,projection:"mercator",renderWorldCopies:!0,onError:e=>console.error(e.error),RTLTextPlugin:"https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"},E=c.forwardRef((e,t)=>{const n=c.useContext(z),[r,o]=c.useState(null),i=c.useRef(),{current:s}=c.useRef({mapLib:null,map:null});c.useEffect(()=>{const l=e.mapLib;let a=!0,d;return Promise.resolve(l||k(()=>import("./mapbox-gl-d07c308f.js").then(f=>f.m),["assets/mapbox-gl-d07c308f.js","assets/index-85cf5052.js","assets/index-048954d9.css"])).then(f=>{if(a){if(f.Map||(f=f.default),!f||!f.Map)throw new Error("Invalid mapLib");if(f.supported(e))Y(f,e),e.reuseMaps&&(d=v.reuse(e,i.current)),d||(d=new v(f.Map,e,i.current)),s.map=Z(d,f),s.mapLib=f,o(d),n==null||n.onMapMount(s.map,e.id);else throw new Error("Map is not supported by this browser")}}).catch(f=>{e.onError({type:"error",target:null,originalEvent:null,error:f})}),()=>{a=!1,d&&(n==null||n.onMapUnmount(e.id),e.reuseMaps?d.recycle():d.destroy())}},[]),j(()=>{r&&r.setProps(e)}),c.useImperativeHandle(t,()=>s.map,[r]);const u=c.useMemo(()=>({position:"relative",width:"100%",height:"100%",...e.style}),[e.style]);return c.createElement("div",{id:e.id,ref:i,style:u},r&&c.createElement(y.Provider,{value:s},c.createElement("div",{"mapboxgl-children":""},e.children)))});E.displayName="Map";E.defaultProps=W;const K=/box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;function h(e,t){if(!e||!t)return;const n=e.style;for(const r in t){const o=t[r];Number.isFinite(o)&&!K.test(r)?n[r]=`${o}px`:n[r]=o}}const q={draggable:!1,popup:null,rotation:0,rotationAlignment:"auto",pitchAlignment:"auto"};function L(e){const{map:t,mapLib:n}=c.useContext(y),r=c.useRef({props:e});r.current.props=e;const o=c.useMemo(()=>{let i=!1;c.Children.forEach(e.children,l=>{l&&(i=!0)});const s={...e,element:i?document.createElement("div"):null},u=new n.Marker(s).setLngLat([e.longitude,e.latitude]);return u.getElement().addEventListener("click",l=>{var a,d;(d=(a=r.current.props).onClick)===null||d===void 0||d.call(a,{type:"click",target:u,originalEvent:l})}),u.on("dragstart",l=>{var a,d;const f=l;f.lngLat=o.getLngLat(),(d=(a=r.current.props).onDragStart)===null||d===void 0||d.call(a,f)}),u.on("drag",l=>{var a,d;const f=l;f.lngLat=o.getLngLat(),(d=(a=r.current.props).onDrag)===null||d===void 0||d.call(a,f)}),u.on("dragend",l=>{var a,d;const f=l;f.lngLat=o.getLngLat(),(d=(a=r.current.props).onDragEnd)===null||d===void 0||d.call(a,f)}),u},[]);return c.useEffect(()=>(o.addTo(t.getMap()),()=>{o.remove()}),[]),c.useEffect(()=>{h(o.getElement(),e.style)},[e.style]),(o.getLngLat().lng!==e.longitude||o.getLngLat().lat!==e.latitude)&&o.setLngLat([e.longitude,e.latitude]),e.offset&&!B(o.getOffset(),e.offset)&&o.setOffset(e.offset),o.isDraggable()!==e.draggable&&o.setDraggable(e.draggable),o.getRotation()!==e.rotation&&o.setRotation(e.rotation),o.getRotationAlignment()!==e.rotationAlignment&&o.setRotationAlignment(e.rotationAlignment),o.getPitchAlignment()!==e.pitchAlignment&&o.setPitchAlignment(e.pitchAlignment),o.getPopup()!==e.popup&&o.setPopup(e.popup),b.createPortal(e.children,o.getElement())}L.defaultProps=q;const G=c.memo(L);function x(e){return new Set(e?e.trim().split(/\s+/):[])}function X(e){const{map:t,mapLib:n}=c.useContext(y),r=c.useMemo(()=>document.createElement("div"),[]),o=c.useRef({props:e});o.current.props=e;const i=c.useMemo(()=>{const s={...e},u=new n.Popup(s).setLngLat([e.longitude,e.latitude]);return u.once("open",l=>{var a,d;(d=(a=o.current.props).onOpen)===null||d===void 0||d.call(a,l)}),u},[]);if(c.useEffect(()=>{const s=u=>{var l,a;(a=(l=o.current.props).onClose)===null||a===void 0||a.call(l,u)};return i.on("close",s),i.setDOMContent(r).addTo(t.getMap()),()=>{i.off("close",s),i.isOpen()&&i.remove()}},[]),c.useEffect(()=>{h(i.getElement(),e.style)},[e.style]),i.isOpen()&&((i.getLngLat().lng!==e.longitude||i.getLngLat().lat!==e.latitude)&&i.setLngLat([e.longitude,e.latitude]),e.offset&&!m(i.options.offset,e.offset)&&i.setOffset(e.offset),(i.options.anchor!==e.anchor||i.options.maxWidth!==e.maxWidth)&&(i.options.anchor=e.anchor,i.setMaxWidth(e.maxWidth)),i.options.className!==e.className)){const s=x(i.options.className),u=x(e.className);for(const l of s)u.has(l)||i.removeClassName(l);for(const l of u)s.has(l)||i.addClassName(l);i.options.className=e.className}return b.createPortal(e.children,r)}const J=c.memo(X);function p(e,t,n,r){const o=c.useContext(y),i=c.useMemo(()=>e(o),[]);return c.useEffect(()=>{const s=r||n||t,u=typeof t=="function"&&typeof n=="function"?t:null,l=typeof n=="function"?n:typeof t=="function"?t:null,{map:a}=o;return a.hasControl(i)||(a.addControl(i,s==null?void 0:s.position),u&&u(o)),()=>{l&&l(o),a.hasControl(i)&&a.removeControl(i)}},[]),i}function $(e){const t=p(({mapLib:n})=>new n.AttributionControl(e),{position:e.position});return c.useEffect(()=>{h(t._container,e.style)},[e.style]),null}c.memo($);function ee(e){const t=p(({mapLib:n})=>new n.FullscreenControl({container:e.containerId&&document.getElementById(e.containerId)}),{position:e.position});return c.useEffect(()=>{h(t._controlContainer,e.style)},[e.style]),null}c.memo(ee);const T=c.forwardRef((e,t)=>{const n=c.useRef({props:e}),r=p(({mapLib:o})=>{const i=new o.GeolocateControl(e),s=i._setupUI;return i._setupUI=u=>{i._container.hasChildNodes()||s(u)},i.on("geolocate",u=>{var l,a;(a=(l=n.current.props).onGeolocate)===null||a===void 0||a.call(l,u)}),i.on("error",u=>{var l,a;(a=(l=n.current.props).onError)===null||a===void 0||a.call(l,u)}),i.on("outofmaxbounds",u=>{var l,a;(a=(l=n.current.props).onOutOfMaxBounds)===null||a===void 0||a.call(l,u)}),i.on("trackuserlocationstart",u=>{var l,a;(a=(l=n.current.props).onTrackUserLocationStart)===null||a===void 0||a.call(l,u)}),i.on("trackuserlocationend",u=>{var l,a;(a=(l=n.current.props).onTrackUserLocationEnd)===null||a===void 0||a.call(l,u)}),i},{position:e.position});return n.current.props=e,c.useImperativeHandle(t,()=>({trigger:()=>r.trigger()}),[]),c.useEffect(()=>{h(r._container,e.style)},[e.style]),null});T.displayName="GeolocateControl";const te=c.memo(T);function ne(e){const t=p(({mapLib:n})=>new n.NavigationControl(e),{position:e.position});return c.useEffect(()=>{h(t._container,e.style)},[e.style]),null}const oe=c.memo(ne),ie={unit:"metric",maxWidth:100};function R(e){const t=p(({mapLib:n})=>new n.ScaleControl(e),{position:e.position});return(t.options.unit!==e.unit||t.options.maxWidth!==e.maxWidth)&&(t.options.maxWidth=e.maxWidth,t.setUnit(e.unit)),c.useEffect(()=>{h(t._container,e.style)},[e.style]),null}R.defaultProps=ie;c.memo(R);const re="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC/0lEQVR4nO2az2sTQRTHnx6y+327IYUI6lWlQlH/Cw9FBIX66+LJg/4XpRURFL0oWnsWwZNHEUpbxGpr8iYpFqU3qy20XoT+QCs0MmlTQ5smu5uZ3Y30C++S+fl5M2/mZViiff3H+pzPZ8V1rwnwTDFPKWBJMa9XDVgS5kldVnTdq7oupU0F5qOK+YliXlXMlYC2qoDhouOcSHr+NEvkKGBAmFdCAOy0dQHu6r4oCRV8/5BiHm8DYKdNTDIfiRWi5HmnhHnOIETNvuq+Y4GY9rzDliC2YfQYViFGiVy9BSxCVLbsndWY0YEdA0SlasAda0dsm6dTKBPm39OOc8w4yNY9EWVSmxdiNJghoxCfiHxhXo4wmTF9CpUymW4BXkcAWdFjGwPRaUfISczrNnv0Mx+qL9e9bA5kM3cKto2A+7U8SntTAfe01Tyry3SdoNtNmJ8aA6kmgK0HHS973ulamxJwXt8JdafQgjBfrxAdqJZnMt0KeBOg3/fmQIAfLbx2ozZB8f0eAUb2rAuM6Dq6rm6j2zbtG1g0BqKPwqZeA/q3oYNtmfU6J/W3cNIvYyCKea3FxNbq6gYK4ih9ty1h/h5iYrt+a1YWINjn2if4N9jHpEAU85Q5EGA4wRUZMgYiwK2kQIrATWMgOnlLDMQx/J9egC9BQMKqKQgwQ6YlwO24QQQYNEuxtb2EeSPAKWPEhHnD2lORAKNxgSjmMSsQVRDm3hhXpJdsKmAm3B4EILUk1B4IcMH6igAXyba0pxRQtggxUyE6SHFIgD6LIJdigaiDGbEQ4G+tx8YuEN/vifrMs4f9KXremVghtmGYHxhcjYeUlKovImGfdxpBAIsql+uiJGUi8Euue4XSIAU8bwPkBaVFKpfrEuZvEY7ahclsNk9pknje2QjZ8TlKo4T5UQiIx5RWzRI5AhQDbKnyBBEozSo4znEF/GxyXyyXs9mT1AkSoK9RvOjfdBl1kgQYbLClBqjTVNHpPvPLOpBXsaXnVj6yYf6gLZUf0eyL7OkvfQXvjBauRkwAAAAASUVORK5CYII=";function se(e){const t={height:"500px"};window.matchMedia("(max-width: 768px)").matches&&(t.height="300px");const[r,o]=c.useState(!1),[i,s]=c.useState({longitude:e.longitude,latitude:e.latitude,zoom:11,scrollZoom:!1});return g(P,{children:N(E,{mapboxAccessToken:"pk.eyJ1Ijoic2hlbWlsIiwiYSI6ImNsZTVhdjBtejBiOXMzcHFkeDdzenVubnQifQ.ELopMEw5SnKU0QOU85_Bdg",initialViewState:i,mapStyle:"mapbox://styles/mapbox/streets-v11",style:t,onClick:u=>o(!r),children:[g(te,{positionOptions:{enableHighAccuracy:!0},trackUserLocation:!0}),g(oe,{}),g(G,{longitude:i.longitude,latitude:i.latitude,anchor:"bottom",children:g("img",{src:re})}),r&&g(J,{longitude:i.longitude,latitude:i.latitude,anchor:"top",onClose:()=>o(!1),className:"shadow-lg rounded-lg tracking-wider text-gray-800",children:"StayHub Home here!"})]})})}export{se as default};
