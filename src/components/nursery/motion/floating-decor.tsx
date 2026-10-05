import leaves from '@/assets/foreground-leaves.png';

export function FloatingDecor({ scene }: { scene: 'hero' | 'story' | 'collection' }) {
  return <div className={`floating-decor decor-${scene}`} aria-hidden="true">
    <div className="decor-scroll decor-leaf-near" data-decor-depth="-150"><div className="decor-pointer"><img className="decor-idle" src={leaves} alt="" width={1024} height={1024}/></div></div>
    <div className="decor-scroll decor-leaf-far" data-decor-depth="-85"><div className="decor-pointer"><img className="decor-idle" src={leaves} alt="" width={1024} height={1024}/></div></div>
    <div className="decor-scroll decor-diamond" data-decor-depth="-65"><svg viewBox="0 0 160 260" fill="none"><path d="M80 2 158 130 80 258 2 130 80 2Z M80 35 139 130 80 225 21 130 80 35Z M80 2v256" stroke="currentColor" strokeWidth=".7"/></svg></div>
  </div>;
}
