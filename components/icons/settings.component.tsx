interface Props {
  color?: string;
  size: "24" | "18";
  [key: string]: any;
}

export function SettingsIcon(props: Props) {
  if (props.size == "18") {
    return (
      <svg
        width={18}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="m15.558 11.79-.64-.391.64.391Zm-.716 1.17.64.391-.64-.391Zm-12.4-6.75-.64-.392.64.392Zm.716-1.17.64.392-.64-.392Zm1.956-.494.358-.658-.358.658ZM2.966 8.054l-.358.658.358-.658Zm9.92 5.4-.358.658.358-.658Zm2.148-3.508-.359.659.359-.659ZM3.158 12.96l-.64.391.64-.391Zm-.716-1.17.64-.391-.64.391Zm12.4-6.75.64-.391-.64.391Zm.716 1.17-.64.391.64-.391Zm-.524 1.844.358.658-.358-.658Zm-2.148-3.508.359.659-.359-.659Zm-9.92 5.4.359.659-.359-.659Zm2.148 3.508-.359-.659.359.659Zm7.696-8.866-.359-.659.359.659Zm-7.62 0-.359.658.359-.658Zm7.62 8.824.359-.659-.359.66Zm-7.62 0 .359.659-.359-.659ZM8.284 3h1.432V1.5H8.284V3Zm1.432 12H8.284v1.5h1.432V15Zm-1.432 0c-.419 0-.682-.31-.682-.6h-1.5c0 1.2 1.02 2.1 2.182 2.1V15Zm2.114-.6c0 .29-.263.6-.682.6v1.5c1.163 0 2.182-.9 2.182-2.1h-1.5ZM9.716 3c.419 0 .682.31.682.6h1.5c0-1.2-1.02-2.1-2.182-2.1V3ZM8.284 1.5c-1.163 0-2.182.9-2.182 2.1h1.5c0-.29.263-.6.682-.6V1.5Zm6.634 9.899-.716 1.169 1.28.783.716-1.169-1.28-.783ZM3.082 6.6l.716-1.169-1.28-.783-.716 1.169 1.28.783Zm.716-1.169c.176-.289.606-.418.957-.227l.717-1.317c-1.018-.555-2.34-.242-2.954.76l1.28.784Zm-.473 1.963c-.328-.178-.403-.533-.243-.794l-1.28-.783c-.63 1.03-.236 2.327.806 2.894l.717-1.317Zm10.877 5.173c-.176.289-.606.418-.957.227l-.717 1.317c1.018.555 2.34.242 2.954-.76l-1.28-.784Zm1.996-.386c.63-1.03.236-2.327-.806-2.894l-.717 1.317c.328.178.403.533.243.794l1.28.783Zm-12.4.386-.716-1.17-1.28.784.716 1.17 1.28-.784Zm10.404-7.136.716 1.17 1.28-.784-.716-1.17-1.28.784Zm.716 1.17c.16.26.085.615-.243.793l.717 1.317c1.042-.567 1.437-1.863.806-2.894l-1.28.783Zm-1.673-1.397c.35-.191.78-.062.957.227l1.28-.783c-.614-1.003-1.936-1.316-2.954-.761l.717 1.317ZM3.082 11.399c-.16-.26-.085-.616.243-.794l-.717-1.317c-1.042.567-1.437 1.863-.806 2.894l1.28-.783Zm-.564 1.952c.614 1.003 1.936 1.316 2.954.761l-.717-1.317c-.35.191-.78.062-.957-.227l-1.28.783Zm10.65-8.105.077-.041-.717-1.317-.077.041.718 1.317Zm-8.413-.041.076.041.718-1.317-.077-.041-.717 1.317Zm8.49 7.59-.076-.041-.718 1.317.076.041.718-1.317Zm-8.414-.041-.076.041.717 1.317.077-.041-.718-1.317ZM2.608 8.712a.327.327 0 0 1 0 .576l.717 1.317c1.271-.692 1.271-2.518 0-3.21l-.717 1.317Zm2.94 5.359a.375.375 0 0 1 .554.329h1.5c0-1.422-1.521-2.326-2.77-1.646l.717 1.317Zm6.35.329c0-.284.304-.465.553-.329l.718-1.317c-1.25-.68-2.771.224-2.771 1.646h1.5Zm3.494-5.112a.327.327 0 0 1 0-.576l-.717-1.317c-1.271.692-1.271 2.518 0 3.21l.717-1.317ZM4.832 5.246c1.249.68 2.77-.224 2.77-1.646h-1.5a.375.375 0 0 1-.553.329L4.83 5.246Zm7.62-1.317a.375.375 0 0 1-.554-.329h-1.5c0 1.422 1.521 2.326 2.77 1.646l-.717-1.317ZM10.5 9A1.5 1.5 0 0 1 9 10.5V12a3 3 0 0 0 3-3h-1.5ZM9 10.5A1.5 1.5 0 0 1 7.5 9H6a3 3 0 0 0 3 3v-1.5ZM7.5 9A1.5 1.5 0 0 1 9 7.5V6a3 3 0 0 0-3 3h1.5ZM9 7.5A1.5 1.5 0 0 1 10.5 9H12a3 3 0 0 0-3-3v1.5Z"
          fill={props.color ?? "#555"}
        />
      </svg>
    );
  }

  return null;
}
