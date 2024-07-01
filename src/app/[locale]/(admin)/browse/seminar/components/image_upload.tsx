import Image from "next/image";

export default function UploadImage() {
  return (
    <div>
      <label className="mt-[20px] flex items-center w-max px-[10px] py-[16px] border-1 border-[#d0d5dd] rounded-[0.5rem] gap-2">
        <Image src="/assets/svg/UploadFolder.svg" alt="" />
        <input className="upload-input" type="file" />
        <span>Browse</span>
      </label>

      {/* <div class="img-preview" *ngIf="imageInfos | async">
  <img appLazyLoad [src]="imageInfos | async" class="preview" alt="preview">
</div> */}
    </div>
  );
}
