export default function BiArrowToTop(props: { class: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24">
      <path d="M6 4h12v2H6zm.707 11.707L11 11.414V20h2v-8.586l4.293 4.293 1.414-1.414L12 7.586l-6.707 6.707z" />
    </svg>
  );
}
