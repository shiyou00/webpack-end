import _ from "lodash";
import $ from "jquery";

const dom = $("<div>");
dom.html(_.join(['hello','webpack'],'!!!'));
$("body").append(dom);
