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
        <div data-pin data-swap={swap} className={"absolute top-0 left-0 z-10 flex items-center justify-center px-[16px] py-[10px] bg-black" + (window.__EDITOR ? "" : " pointer-events-none")}>
          {v === "@logo"
            ? <img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[24px] object-contain" />
            : <p className="font-medium leading-none text-[24px] text-white tracking-[0.2px] whitespace-nowrap font-[Geist,sans-serif]">{(v && v !== "@logo") ? v : text}</p>}
        </div>
      );
    };
    return (
      <div className="relative overflow-hidden bg-black" style={{ width: 1080, height: 1920 }}>
        <div className="hidden" />
        <div className="absolute inset-0 flex items-center justify-center gap-[12px]">
          <div className="relative h-[950px] w-[534px]">
            <Slot k="slot1" className="absolute inset-0 bg-[#dedede]" />
            {Tag({ swap: "label1", text: "Before" })}
          </div>
          <div className="relative h-[950px] w-[534px]">
            <Slot k="slot2" className="absolute inset-0 bg-[#8f8f8f]" />
            {Tag({ swap: "label2", text: "After" })}
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
