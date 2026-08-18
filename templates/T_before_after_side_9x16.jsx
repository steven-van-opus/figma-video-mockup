/* Template before-after-side-9x16 — Before + After Side by Side 9:16 */
(function () {
  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
    const [labelText, setLabelText] = useState(() => (props && props.preload && props.preload.labelText) || {});
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.setLabelText = setLabelText; }, []);
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.labelText = labelText; }, [labelText]);
    const pick = k => {
      const i = document.createElement('input');
      i.type = 'file';
      i.accept = 'video/*,image/*';
      i.onchange = e => { const f = e.target.files[0]; if (f) setVids(v => ({ ...v, [k]: { url: URL.createObjectURL(f), img: (f.type||"").startsWith("image") } })); };
      i.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0';document.body.appendChild(i);i.addEventListener('change',function(){setTimeout(function(){i.remove();},0);},{once:true});i.click();
    };
    const Slot = ({ k, className, style }) => (
      <div data-vslot={k} onClick={() => pick(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={style}>
        {vids[k]
          ? (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
          : null}
      </div>
    );

    const Tag = ({ swap, text }) => {
      const v = labelText[swap];
      return (
        <div data-swap={swap} className={"flex items-center justify-center px-[28px] py-[16px] bg-black" + (window.__EDITOR ? "" : " pointer-events-none")}>
          {v === "@logo"
            ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[64px] object-contain" />
            : <p className="font-medium leading-none text-[75px] text-white tracking-[0.2px] whitespace-nowrap font-[Geist,sans-serif]">{(v && v !== "@logo") ? v : text}</p>}
        </div>
      );
    };
    return (
      <div className="relative overflow-hidden bg-black" style={{ width: 1080, height: 1920 }}>
        <div className="hidden" />
        <div className="absolute top-[90px] left-0 right-0 flex justify-center">
          <svg aria-label="agent opus logo mark" viewBox="0 0 150 150" width="150" height="150" fill="none"><path d="M76.3852 24.9991C104 24.9992 126.386 47.3811 126.386 74.9904C126.386 102.6 104 124.982 76.3852 124.982C74.0828 124.982 71.8168 124.825 69.5974 124.524V109.205C71.7933 109.638 74.063 109.866 76.3852 109.866C95.65 109.866 111.267 94.2515 111.267 74.9904C111.267 55.7292 95.65 40.1152 76.3852 40.1151C57.1726 40.1151 41.5876 55.6447 41.5033 74.8339V77.5133C41.5033 87.1713 41.5029 99.1163 41.5028 108.647V125.001H26.3845V74.9904C26.3845 47.3811 48.7707 24.9991 76.3852 24.9991Z" fill="#ffffff"></path><path d="M76.3852 46.6015C92.0592 46.6016 104.779 59.2943 104.779 74.9681C104.779 90.642 92.0592 103.335 76.3852 103.335C74.0455 103.335 71.7721 103.052 69.5974 102.519V86.358C71.583 87.5396 73.9044 88.2192 76.3852 88.2192C83.7247 88.2191 89.6607 82.2787 89.6607 74.9681C89.6606 67.6575 83.7246 61.7175 76.3852 61.7174C69.0916 61.7174 63.1839 67.5834 63.1102 74.8312L63.1093 124.982H47.9909V74.9681C47.991 59.2942 60.7112 46.6015 76.3852 46.6015Z" fill="#ffffff"></path></svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center gap-[12px]">
          <div className="flex flex-col items-center gap-[20px]">
            {Tag({ swap: "label1", text: "Before" })}
            <div className="relative h-[950px] w-[534px]">
              <Slot k="slot1" className="absolute inset-0 bg-[#dedede]" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-[20px]">
            {Tag({ swap: "label2", text: "After" })}
            <div className="relative h-[950px] w-[534px]">
              <Slot k="slot2" className="absolute inset-0 bg-[#8f8f8f]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({
    id: "before-after-side-9x16",
    name: "Before + After Side by Side 9:16",
    width: 1080,
    height: 1920,
    slots: 2,
    desc: "Two vertical clips side by side: Before on the left, After on the right. Combine with each slot's “Freeze after” setting to stop one clip at a chosen second while the other keeps playing.",
    Component
  });
})();
