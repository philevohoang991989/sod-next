import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import React from "react";

interface Props {
  listBreadcrumb: any;
}
export default function BreadcrumbCustom({ listBreadcrumb }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {listBreadcrumb.map((item: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`${item.link}`}>
                  {item.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {listBreadcrumb.length - 1 === index ? (
                ""
              ) : (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
        {/* <BreadcrumbItem>
            <BreadcrumbLink href="/learning">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/learning/seminar/list">Seminar</BreadcrumbLink>
          </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
