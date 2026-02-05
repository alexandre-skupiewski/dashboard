"use client";

import { Column } from "../table"
import { Model } from "@/helpers/models/models";

export default interface ColumnContent<M extends Model> {
  column: Column<M>,
  model: M
}
