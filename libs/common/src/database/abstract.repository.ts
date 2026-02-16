import { Model, QueryFilter, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  /**
   * Creates and persists a new document in the database.
   *
   * @param document - Document data excluding the `_id` field.
   * @returns The newly created document.
   */
  async create(document: Omit<TDocument, "_id">): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  /**
   * Finds a single document matching the given filter.
   *
   * @param filterQuery - Mongoose query filter.
   * @throws NotFoundException if no document is found.
   * @returns The found document.
   */
  async findOne(filterQuery: QueryFilter<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        "Document was not found with queryFilter: ",
        filterQuery,
      );
      throw new NotFoundException("Document was not found.");
    }

    return document;
  }

  /**
   * Finds a document by filter and updates it.
   *
   * @param filterQuery - Mongoose query filter.
   * @param update - Update operations to apply.
   * @throws NotFoundException if no document is found.
   * @returns The updated document.
   */
  async findOneAndUpdate(
    filterQuery: QueryFilter<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        "Document was not found with queryFilter: ",
        filterQuery,
      );
      throw new NotFoundException("Document was not found.");
    }
    return document;
  }

  /**
   * Finds multiple documents matching the given filter.
   *
   * @param filterQuery - Mongoose query filter.
   * @returns An array of matching documents.
   */
  async find(filterQuery: QueryFilter<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  /**
   * Finds and deletes a single document matching the given filter.
   *
   * @param filterQuery - Mongoose query filter.
   * @returns The deleted document.
   */
  async findOneAndDelete(
    filterQuery: QueryFilter<TDocument>,
  ): Promise<TDocument> {
    return this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true) as unknown as TDocument;
  }
}
